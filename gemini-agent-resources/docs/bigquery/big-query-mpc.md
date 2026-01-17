# Build data analytics agents faster with BigQuery's fully managed, remote MCP server

Connecting AI agents to your enterprise data shouldn't require complex custom
integrations or weeks of development. With the release of fully managed, remote
Model Context Protocol (MCP) servers for Google services last month, you can now
use BigQuery MCP server to give your AI agents a direct, secure way to analyze
data. This fully managed MCP server removes management overhead, enabling you to
focus on developing intelligent agents.

MCP server support for BigQuery is also available via the open source MCP
Toolbox for Databases, designed for those seeking more flexibility and control
over the servers. In this blog post, we discuss and demonstrate the integrations
of newly released fully managed, remote BigQuery Server, which is in preview as
of January 2026.

Remote MCP servers run on the service's infrastructure and offer an HTTP
endpoint to AI applications. This enables communication between the AI MCP
client and the MCP server using a defined standard.

MCP helps accelerate the AI agent building process by giving LLM-powered
applications direct access to your analytics data through a defined set of
tools. Integrating the BigQuery MCP server with the ADK using the Google OAuth
authentication method can be straightforward, as you can see below with our
discussion of Agent Development Kit (ADK) and Gemini CLI. Platforms and
frameworks such as LangGraph, Claude code, Cursor IDE, or other MCP clients can
also be integrated without significant effort.

Let's get started.

## Use BigQuery MCP server with ADK

To build a BigQuery Agent prototype with ADK, follow a six-step process:

1. **Prerequisites**: Set up the project, necessary settings, and environment.
2. **Configuration**: Enable MCP and required APIs.
3. **Load a sample dataset**.
4. **Create an OAuth Client**.
5. **Create a Gemini API Key**.
6. **Create and test agents**.

**IMPORTANT**: When planning for a production deployment or using AI agents with
real data, ensure adherence to AI security and safety and stability guidelines.

### Step 1: Prerequisites > Configuration and environment

#### 1.1 Set up a Cloud Project

Create or use existing Google Cloud Project with billing enabled.

#### 1.2 User roles

Ensure your user account has the following permissions to the project:

- `roles/bigquery.user` (for running queries)
- `roles/bigquery.dataViewer` (for accessing data)
- `roles/mcp.toolUser` (for accessing MCP tools)
- `roles/serviceusage.serviceUsageAdmin` (for enabling apis)
- `roles/iam.oauthClientViewer` (oAuth)
- `roles/iam.serviceAccountViewer` (oAuth)
- `roles/oauthconfig.editor` (oAuth)

#### 1.3 Set up environment

Use MacOS or Linux Terminal with the gcloud CLI installed.

In the shell, run the following command with your Cloud PROJECT_ID and
authenticate to your Google Cloud account; this is required to enable ADK to
access BigQuery.

```bash
# Set your cloud project id in env variable
BIGQUERY_PROJECT=PROJECT_ID

gcloud config set project ${BIGQUERY_PROJECT}
gcloud auth application-default login
```

Follow the prompts to complete the authentication process.

### Step 2: Configuration > User roles and APIs

#### 2.1 Enable BigQuery and MCP APIs

Run the following command to enable the BigQuery APIs and the MCP APIs.

```bash
gcloud services enable bigquery.googleapis.com --project=${BIGQUERY_PROJECT}
gcloud beta services mcp enable bigquery.googleapis.com --project=${BIGQUERY_PROJECT}
```

### Step 3: Load sample dataset > cymbal_pets dataset

#### 3.1 Create cymbal_pets dataset

For this demo, let's use the cymbal_pets dataset. Run the following command to
load the cymbal_pets database from the public storage bucket:

```bash
# Create the dataset if it doesn't exist (pick a location of your choice)
# You can add --default_table_expiration to auto expire tables.
bq --project_id=${BIGQUERY_PROJECT} mk -f --dataset --location=US cymbal_pets

# Load the data
for table in products customers orders order_items; do
bq --project_id=${BIGQUERY_PROJECT} query --nouse_legacy_sql \
    "LOAD DATA OVERWRITE cymbal_pets.${table} FROM FILES(
        format = 'avro',
        uris = [ 'gs://sample-data-and-media/cymbal-pets/tables/${table}/*.avro']);"
done
```

### Step 4: Create OAuth Client ID

#### 4.1 Create OAuth Client ID

We will be using Google OAuth to connect to the BigQuery MCP server.

1. In the Google Cloud console, go to **Google Auth Platform > Clients > Create
   client**
2. Select **Application type** value as "Desktop app".
3. Once client is created, make sure to copy the **Client ID** and **Secret**
   and keep it safe.

**Optional**: If you used a different project for OAuth client, run this with
your CLIENT_ID_PROJECT:

```bash
gcloud beta services mcp enable bigquery.googleapis.com --project=CLIENT_ID_PROJECT
```

**Note [for Cloud Shell Users only]**: If you are using Google Cloud Shell or
any hosting environment other than localhost, you must create a "Web
application" OAuth Client ID.

For a Cloud Shell environment:

- For "Authorized JavaScript origins" value use output of this command:
  ```bash
  echo "https://8000-$WEB_HOST"
  ```
- For "Authorized redirect URIs" value use output of this command:
  ```bash
  echo "https://8000-$WEB_HOST/dev-ui/"
  ```
  (URIs in Cloud Shell are temporary and expire after the current session)

**Note**: If you decide to use a web server, then you will need to use the "Web
Application" type OAuth Client and fill in the appropriate domain and redirect
URIs.

### Step 5: API Key for Gemini

#### 5.1 Create API Key for Gemini

Create a Gemini API key at
[API Keys page](https://console.cloud.google.com/apis/credentials). We will need
a generated key to access the Gemini model using ADK.

### Step 6: Create ADK web application

#### 6.1 Install ADK

To install ADK and initiate an agent project, follow the instructions outlined
in the
[Python Quickstart for ADK](https://cloud.google.com/agent-development-kit/docs/quickstart).

#### 6.2 Create a new ADK Agent

Now, create a new agent for our BigQuery remote MCP server integration.

```bash
adk create cymbal_pets_analyst

# When prompted, choose the following:
# 2. Other models (fill later)
```

#### 6.3 Configure the env file

Run following command to update the `cymbal_pets_analyst/.env` file, with the
below list of variables and their actual values.

```bash
cat >> cymbal_pets_analyst/.env <<EOF
GOOGLE_GENAI_USE_VERTEXAI=FALSE
GOOGLE_CLOUD_PROJECT=BIGQUERY_PROJECT
GOOGLE_CLOUD_LOCATION=REGION
GOOGLE_API_KEY=AI_STUDIO_API_KEY
OAUTH_CLIENT_ID=YOUR_CLIENT_ID
OAUTH_CLIENT_SECRET=YOUR_CLIENT_SECRET
EOF
```

#### 6.4 Update the agent code

Edit the `cymbal_pets_analyst/agent.py` file, replace file content with the
following code.

```python
import os
from google.adk.agents.llm_agent import Agent
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams
from google.adk.auth.auth_credential import AuthCredential, AuthCredentialTypes
from google.adk.auth import OAuth2Auth
from fastapi.openapi.models import OAuth2
from fastapi.openapi.models import OAuthFlowAuthorizationCode
from fastapi.openapi.models import OAuthFlows
from google.adk.auth import AuthCredential
from google.adk.auth import AuthCredentialTypes
from google.adk.auth import OAuth2Auth

def get_oauth2_mcp_tool():
    auth_scheme = OAuth2(
        flows=OAuthFlows(
            authorizationCode=OAuthFlowAuthorizationCode(
                authorizationUrl="https://accounts.google.com/o/oauth2/auth",
                tokenUrl="https://oauth2.googleapis.com/token",
                scopes={
                    "https://www.googleapis.com/auth/bigquery": "bigquery"
                },
            )
        )
    )
    auth_credential = AuthCredential(
        auth_type=AuthCredentialTypes.OAUTH2,
        oauth2=OAuth2Auth(
            client_id=os.environ.get('OAUTH_CLIENT_ID', ''),
            client_secret=os.environ.get('OAUTH_CLIENT_SECRET', '')
        ),
    )

    bigquery_mcp_tool_oauth = McpToolset(
        connection_params=StreamableHTTPConnectionParams(
            url='https://bigquery.googleapis.com/mcp'),
        auth_credential=auth_credential,
        auth_scheme=auth_scheme,
    )
    return bigquery_mcp_tool_oauth


root_agent = Agent(
    model='gemini-3-pro-preview',
    name='root_agent',
    description='Analyst to answer all questions related to cymbal pets store.',
    instruction='Answer user questions, use the bigquery_mcp tool to query the cymbal pets database and run queries.',
    tools=[get_oauth2_mcp_tool()],
)
```

#### 6.5 Run the ADK application

Run this command from the parent directory that contains `cymbal_pets_analyst`
folder.

```bash
adk web --port 8000 .
```

Launch the browser, point to `http://127.0.0.1:8000/` or the host where you are
running ADK, and select your agent name from the dropdown. You now have your
personal agent to answer questions about the cymbal pets data. When the agent
connects to the MCP server, it will initiate the OAuth flow and you will be able
to grant permissions to access.

As you can notice in the second prompt, you no longer need to specify the
project id. This is because the agent can infer this information from the
conversation.

Here are some questions you can ask:

- What datasets are in my_project?
- What tables are in the cymbal_pets dataset?
- Get the schema of the table customers in cymbal_pets dataset
- Find the top 3 orders by volume in the last 3 months for the cymbal pet store
  in the US west region. Identify the customer who placed the order and also
  their email id.
- Can you get top 10 orders instead of the top one?
- Which product sold the most in the last 6 months?

## Use BigQuery MCP server with Gemini CLI

To use Gemini CLI, you can use the following configuration in your
`~/.gemini/settings.json` file. If you have an existing configuration, you will
need to merge this under `mcpServers` field.

```json
{
  "mcpServers": {
    "bigquery": {
      "httpUrl": "https://bigquery.googleapis.com/mcp",
      "authProviderType": "google_credentials",
      "oauth": {
        "scopes": ["https://www.googleapis.com/auth/bigquery"]
      }
    }
  }
}
```

Then run authenticate with gcloud.

```bash
gcloud auth application-default login --client-id-file YOUR_CLIENT_ID_FILE
```

Run Gemini CLI.

```bash
gemini
```

## BigQuery MCP server for your agents

You can integrate BigQuery tools into your development workflow and create
intelligent data agents using LLMs and the BigQuery MCP server. Integration is
based on a single, standard protocol compatible with all leading Agent
development IDEs and frameworks. Of course, before you build agents for
production or use them with real data, be sure to follow AI security and safety
guidelines.

We are excited to see how you leverage BigQuery MCP server to develop data
analytics generative AI applications.

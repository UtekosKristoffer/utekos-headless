# Welcome to Gemini CLI documentation

This documentation provides a comprehensive guide to installing, using, and
developing Gemini CLI, a tool that lets you interact with Gemini models through
a command-line interface.

## Gemini CLI overview

Gemini CLI brings the capabilities of Gemini models to your terminal in an
interactive Read-Eval-Print Loop (REPL) environment. Gemini CLI consists of a
client-side application (`packages/cli`) that communicates with a local server
(`packages/core`), which in turn manages requests to the Gemini API and its AI
models. Gemini CLI also contains a variety of tools for tasks such as performing
file system operations, running shells, and web fetching, which are managed by
`packages/core`.

## Navigating the documentation

This documentation is organized into the following sections:

### Overview

- **[Architecture overview](/docs/architecture):** Understand the high-level
  design of Gemini CLI, including its components and how they interact.
- **[Contribution guide](https://github.com/google-gemini/gemini-cli/blob/main/CONTRIBUTING.md):** Information for contributors and
  developers, including setup, building, testing, and coding conventions.

### Get started

- **[Gemini CLI quickstart](/docs/get-started):** Let's get started with
  Gemini CLI.
- **[Gemini 3 Pro on Gemini CLI](/docs/get-started/gemini-3):** Learn how to
  enable and use Gemini 3.
- **[Authentication](/docs/get-started/authentication):** Authenticate to Gemini
  CLI.
- **[Configuration](/docs/get-started/configuration):** Learn how to configure
  the CLI.
- **[Installation](/docs/get-started/installation):** Install and run Gemini CLI.
- **[Examples](/docs/get-started/examples):** Example usage of Gemini CLI.

### CLI

- **[Introduction: Gemini CLI](/docs/cli):** Overview of the command-line
  interface.
- **[Commands](/docs/cli/commands):** Description of available CLI commands.
- **[Checkpointing](/docs/cli/checkpointing):** Documentation for the
  checkpointing feature.
- **[Custom commands](/docs/cli/custom-commands):** Create your own commands and
  shortcuts for frequently used prompts.
- **[Enterprise](/docs/cli/enterprise):** Gemini CLI for enterprise.
- **[Headless mode](/docs/cli/headless):** Use Gemini CLI programmatically for
  scripting and automation.
- **[Keyboard shortcuts](/docs/cli/keyboard-shortcuts):** A reference for all
  keyboard shortcuts to improve your workflow.
- **[Model selection](/docs/cli/model):** Select the model used to process your
  commands with `/model`.
- **[Sandbox](/docs/cli/sandbox):** Isolate tool execution in a secure,
  containerized environment.
- **[Settings](/docs/cli/settings):** Configure various aspects of the CLI's
  behavior and appearance with `/settings`.
- **[Telemetry](/docs/cli/telemetry):** Overview of telemetry in the CLI.
- **[Themes](/docs/cli/themes):** Themes for Gemini CLI.
- **[Token caching](/docs/cli/token-caching):** Token caching and optimization.
- **[Trusted Folders](/docs/cli/trusted-folders):** An overview of the Trusted
  Folders security feature.
- **[Tutorials](/docs/cli/tutorials):** Tutorials for Gemini CLI.
- **[Uninstall](/docs/cli/uninstall):** Methods for uninstalling the Gemini CLI.

### Core

- **[Introduction: Gemini CLI core](/docs/core):** Information about Gemini
  CLI core.
- **[Memport](/docs/core/memport):** Using the Memory Import Processor.
- **[Tools API](/docs/core/tools-api):** Information on how the core manages and
  exposes tools.
- **[System Prompt Override](/docs/cli/system-prompt):** Replace built-in system
  instructions using `GEMINI_SYSTEM_MD`.

- **[Policy Engine](/docs/core/policy-engine):** Use the Policy Engine for
  fine-grained control over tool execution.

### Tools

- **[Introduction: Gemini CLI tools](/docs/tools):** Information about
  Gemini CLI's tools.
- **[File system tools](/docs/tools/file-system):** Documentation for the
  `read_file` and `write_file` tools.
- **[Shell tool](/docs/tools/shell):** Documentation for the `run_shell_command`
  tool.
- **[Web fetch tool](/docs/tools/web-fetch):** Documentation for the `web_fetch`
  tool.
- **[Web search tool](/docs/tools/web-search):** Documentation for the
  `google_web_search` tool.
- **[Memory tool](/docs/tools/memory):** Documentation for the `save_memory`
  tool.
- **[Todo tool](/docs/tools/todos):** Documentation for the `write_todos` tool.
- **[MCP servers](/docs/tools/mcp-server):** Using MCP servers with Gemini CLI.

### Extensions

- **[Introduction: Extensions](/docs/extensions):** How to extend the CLI
  with new functionality.
- **[Get Started with extensions](/docs/extensions/getting-started-extensions):**
  Learn how to build your own extension.
- **[Extension releasing](/docs/extensions/extension-releasing):** How to release
  Gemini CLI extensions.

### Hooks

- **[Hooks](/docs/hooks):** Intercept and customize Gemini CLI behavior at
  key lifecycle points.
- **[Writing Hooks](/docs/hooks/writing-hooks):** Learn how to create your first
  hook with a comprehensive example.
- **[Best Practices](/docs/hooks/best-practices):** Security, performance, and
  debugging guidelines for hooks.

### IDE integration

- **[Introduction to IDE integration](/docs/ide-integration):** Connect the
  CLI to your editor.
- **[IDE companion extension spec](/docs/ide-integration/ide-companion-spec):**
  Spec for building IDE companion extensions.

### Development

- **[NPM](/docs/npm):** Details on how the project's packages are structured.
- **[Releases](/docs/releases):** Information on the project's releases and
  deployment cadence.
- **[Changelog](/docs/changelogs):** Highlights and notable changes to
  Gemini CLI.
- **[Integration tests](/docs/integration-tests):** Information about the
  integration testing framework used in this project.
- **[Issue and PR automation](/docs/issue-and-pr-automation):** A detailed
  overview of the automated processes we use to manage and triage issues and
  pull requests.

### Support

- **[FAQ](/docs/faq):** Frequently asked questions.
- **[Troubleshooting guide](/docs/troubleshooting):** Find solutions to common
  problems.
- **[Quota and pricing](/docs/quota-and-pricing):** Learn about the free tier and
  paid options.
- **[Terms of service and privacy notice](/docs/tos-privacy):** Information on
  the terms of service and privacy notices applicable to your use of Gemini CLI.

We hope this documentation helps you make the most of Gemini CLI!

# Gemini CLI Architecture Overview

This document provides a high-level overview of the Gemini CLI's architecture.

## Core components

The Gemini CLI is primarily composed of two main packages, along with a suite of
tools that can be used by the system in the course of handling command-line
input:

1.  **CLI package (`packages/cli`):**
    - **Purpose:** This contains the user-facing portion of the Gemini CLI, such
      as handling the initial user input, presenting the final output, and
      managing the overall user experience.
    - **Key functions contained in the package:**
      - [Input processing](/docs/cli/commands.md)
      - History management
      - Display rendering
      - [Theme and UI customization](/docs/cli/themes.md)
      - [CLI configuration settings](/docs/get-started/configuration.md)

2.  **Core package (`packages/core`):**
    - **Purpose:** This acts as the backend for the Gemini CLI. It receives
      requests sent from `packages/cli`, orchestrates interactions with the
      Gemini API, and manages the execution of available tools.
    - **Key functions contained in the package:**
      - API client for communicating with the Google Gemini API
      - Prompt construction and management
      - Tool registration and execution logic
      - State management for conversations or sessions
      - Server-side configuration

3.  **Tools (`packages/core/src/tools/`):**
    - **Purpose:** These are individual modules that extend the capabilities of
      the Gemini model, allowing it to interact with the local environment
      (e.g., file system, shell commands, web fetching).
    - **Interaction:** `packages/core` invokes these tools based on requests
      from the Gemini model.

## Interaction flow

A typical interaction with the Gemini CLI follows this flow:

1.  **User input:** The user types a prompt or command into the terminal, which
    is managed by `packages/cli`.
2.  **Request to core:** `packages/cli` sends the user's input to
    `packages/core`.
3.  **Request processed:** The core package:
    - Constructs an appropriate prompt for the Gemini API, possibly including
      conversation history and available tool definitions.
    - Sends the prompt to the Gemini API.
4.  **Gemini API response:** The Gemini API processes the prompt and returns a
    response. This response might be a direct answer or a request to use one of
    the available tools.
5.  **Tool execution (if applicable):**
    - When the Gemini API requests a tool, the core package prepares to execute
      it.
    - If the requested tool can modify the file system or execute shell
      commands, the user is first given details of the tool and its arguments,
      and the user must approve the execution.
    - Read-only operations, such as reading files, might not require explicit
      user confirmation to proceed.
    - Once confirmed, or if confirmation is not required, the core package
      executes the relevant action within the relevant tool, and the result is
      sent back to the Gemini API by the core package.
    - The Gemini API processes the tool result and generates a final response.
6.  **Response to CLI:** The core package sends the final response back to the
    CLI package.
7.  **Display to user:** The CLI package formats and displays the response to
    the user in the terminal.

## Key design principles

- **Modularity:** Separating the CLI (frontend) from the Core (backend) allows
  for independent development and potential future extensions (e.g., different
  frontends for the same backend).
- **Extensibility:** The tool system is designed to be extensible, allowing new
  capabilities to be added.
- **User experience:** The CLI focuses on providing a rich and interactive
  terminal experience.
  
  # Gemini CLI installation, execution, and deployment

Install and run Gemini CLI. This document provides an overview of Gemini CLI's
installation methods and deployment architecture.

## How to install and/or run Gemini CLI

There are several ways to run Gemini CLI. The recommended option depends on how
you intend to use Gemini CLI.

- As a standard installation. This is the most straightforward method of using
  Gemini CLI.
- In a sandbox. This method offers increased security and isolation.
- From the source. This is recommended for contributors to the project.

### 1. Standard installation (recommended for standard users)

# Welcome to Gemini CLI documentation

This documentation provides a comprehensive guide to installing, using, and
developing Gemini CLI, a tool that lets you interact with Gemini models through
a command-line interface.

## Gemini CLI overview

Gemini CLI brings the capabilities of Gemini models to your terminal in an
interactive Read-Eval-Print Loop (REPL) environment. Gemini CLI consists of a
client-side application (`packages/cli`) that communicates with a local server
(`packages/core`), which in turn manages requests to the Gemini API and its AI
models. Gemini CLI also contains a variety of tools for tasks such as performing
file system operations, running shells, and web fetching, which are managed by
`packages/core`.

## Navigating the documentation

This documentation is organized into the following sections:

### Overview

- **[Architecture overview](/docs/architecture):** Understand the high-level
  design of Gemini CLI, including its components and how they interact.
- **[Contribution guide](https://github.com/google-gemini/gemini-cli/blob/main/CONTRIBUTING.md):** Information for contributors and
  developers, including setup, building, testing, and coding conventions.

### Get started

- **[Gemini CLI quickstart](/docs/get-started):** Let's get started with
  Gemini CLI.
- **[Gemini 3 Pro on Gemini CLI](/docs/get-started/gemini-3):** Learn how to
  enable and use Gemini 3.
- **[Authentication](/docs/get-started/authentication):** Authenticate to Gemini
  CLI.
- **[Configuration](/docs/get-started/configuration):** Learn how to configure
  the CLI.
- **[Installation](/docs/get-started/installation):** Install and run Gemini CLI.
- **[Examples](/docs/get-started/examples):** Example usage of Gemini CLI.

### CLI

- **[Introduction: Gemini CLI](/docs/cli):** Overview of the command-line
  interface.
- **[Commands](/docs/cli/commands):** Description of available CLI commands.
- **[Checkpointing](/docs/cli/checkpointing):** Documentation for the
  checkpointing feature.
- **[Custom commands](/docs/cli/custom-commands):** Create your own commands and
  shortcuts for frequently used prompts.
- **[Enterprise](/docs/cli/enterprise):** Gemini CLI for enterprise.
- **[Headless mode](/docs/cli/headless):** Use Gemini CLI programmatically for
  scripting and automation.
- **[Keyboard shortcuts](/docs/cli/keyboard-shortcuts):** A reference for all
  keyboard shortcuts to improve your workflow.
- **[Model selection](/docs/cli/model):** Select the model used to process your
  commands with `/model`.
- **[Sandbox](/docs/cli/sandbox):** Isolate tool execution in a secure,
  containerized environment.
- **[Settings](/docs/cli/settings):** Configure various aspects of the CLI's
  behavior and appearance with `/settings`.
- **[Telemetry](/docs/cli/telemetry):** Overview of telemetry in the CLI.
- **[Themes](/docs/cli/themes):** Themes for Gemini CLI.
- **[Token caching](/docs/cli/token-caching):** Token caching and optimization.
- **[Trusted Folders](/docs/cli/trusted-folders):** An overview of the Trusted
  Folders security feature.
- **[Tutorials](/docs/cli/tutorials):** Tutorials for Gemini CLI.
- **[Uninstall](/docs/cli/uninstall):** Methods for uninstalling the Gemini CLI.

### Core

- **[Introduction: Gemini CLI core](/docs/core):** Information about Gemini
  CLI core.
- **[Memport](/docs/core/memport):** Using the Memory Import Processor.
- **[Tools API](/docs/core/tools-api):** Information on how the core manages and
  exposes tools.
- **[System Prompt Override](/docs/cli/system-prompt):** Replace built-in system
  instructions using `GEMINI_SYSTEM_MD`.

- **[Policy Engine](/docs/core/policy-engine):** Use the Policy Engine for
  fine-grained control over tool execution.

### Tools

- **[Introduction: Gemini CLI tools](/docs/tools):** Information about
  Gemini CLI's tools.
- **[File system tools](/docs/tools/file-system):** Documentation for the
  `read_file` and `write_file` tools.
- **[Shell tool](/docs/tools/shell):** Documentation for the `run_shell_command`
  tool.
- **[Web fetch tool](/docs/tools/web-fetch):** Documentation for the `web_fetch`
  tool.
- **[Web search tool](/docs/tools/web-search):** Documentation for the
  `google_web_search` tool.
- **[Memory tool](/docs/tools/memory):** Documentation for the `save_memory`
  tool.
- **[Todo tool](/docs/tools/todos):** Documentation for the `write_todos` tool.
- **[MCP servers](/docs/tools/mcp-server):** Using MCP servers with Gemini CLI.

### Extensions

- **[Introduction: Extensions](/docs/extensions):** How to extend the CLI
  with new functionality.
- **[Get Started with extensions](/docs/extensions/getting-started-extensions):**
  Learn how to build your own extension.
- **[Extension releasing](/docs/extensions/extension-releasing):** How to release
  Gemini CLI extensions.

### Hooks

- **[Hooks](/docs/hooks):** Intercept and customize Gemini CLI behavior at
  key lifecycle points.
- **[Writing Hooks](/docs/hooks/writing-hooks):** Learn how to create your first
  hook with a comprehensive example.
- **[Best Practices](/docs/hooks/best-practices):** Security, performance, and
  debugging guidelines for hooks.

### IDE integration

- **[Introduction to IDE integration](/docs/ide-integration):** Connect the
  CLI to your editor.
- **[IDE companion extension spec](/docs/ide-integration/ide-companion-spec):**
  Spec for building IDE companion extensions.

### Development

- **[NPM](/docs/npm):** Details on how the project's packages are structured.
- **[Releases](/docs/releases):** Information on the project's releases and
  deployment cadence.
- **[Changelog](/docs/changelogs):** Highlights and notable changes to
  Gemini CLI.
- **[Integration tests](/docs/integration-tests):** Information about the
  integration testing framework used in this project.
- **[Issue and PR automation](/docs/issue-and-pr-automation):** A detailed
  overview of the automated processes we use to manage and triage issues and
  pull requests.

### Support

- **[FAQ](/docs/faq):** Frequently asked questions.
- **[Troubleshooting guide](/docs/troubleshooting):** Find solutions to common
  problems.
- **[Quota and pricing](/docs/quota-and-pricing):** Learn about the free tier and
  paid options.
- **[Terms of service and privacy notice](/docs/tos-privacy):** Information on
  the terms of service and privacy notices applicable to your use of Gemini CLI.

We hope this documentation helps you make the most of Gemini CLI!

This is the recommended way for end-users to install Gemini CLI. It involves
downloading the Gemini CLI package from the NPM registry.

- **Global install:**

  ```bash
  npm install -g @google/gemini-cli
  ```

  Then, run the CLI from anywhere:

  ```bash
  gemini
  ```

- **NPX execution:**

  ```bash
  # Execute the latest version from NPM without a global install
  npx @google/gemini-cli
  ```

### 2. Run in a sandbox (Docker/Podman)

For security and isolation, Gemini CLI can be run inside a container. This is
the default way that the CLI executes tools that might have side effects.

- **Directly from the registry:** You can run the published sandbox image
  directly. This is useful for environments where you only have Docker and want
  to run the CLI.
  ```bash
  # Run the published sandbox image
  docker run --rm -it us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox:0.1.1
  ```
- **Using the `--sandbox` flag:** If you have Gemini CLI installed locally
  (using the standard installation described above), you can instruct it to run
  inside the sandbox container.
  ```bash
  gemini --sandbox -y -p "your prompt here"
  ```

### 3. Run from source (recommended for Gemini CLI contributors)

Contributors to the project will want to run the CLI directly from the source
code.

- **Development mode:** This method provides hot-reloading and is useful for
  active development.
  ```bash
  # From the root of the repository
  npm run start
  ```
- **Production-like mode (linked package):** This method simulates a global
  installation by linking your local package. It's useful for testing a local
  build in a production workflow.

  ```bash
  # Link the local cli package to your global node_modules
  npm link packages/cli

  # Now you can run your local version using the `gemini` command
  gemini
  ```

---

### 4. Running the latest Gemini CLI commit from GitHub

You can run the most recently committed version of Gemini CLI directly from the
GitHub repository. This is useful for testing features still in development.

```bash
# Execute the CLI directly from the main branch on GitHub
npx https://github.com/google-gemini/gemini-cli
```

## Deployment architecture

The execution methods described above are made possible by the following
architectural components and processes:

**NPM packages**

Gemini CLI project is a monorepo that publishes two core packages to the NPM
registry:

- `@google/gemini-cli-core`: The backend, handling logic and tool execution.
- `@google/gemini-cli`: The user-facing frontend.

These packages are used when performing the standard installation and when
running Gemini CLI from the source.

**Build and packaging processes**

There are two distinct build processes used, depending on the distribution
channel:

- **NPM publication:** For publishing to the NPM registry, the TypeScript source
  code in `@google/gemini-cli-core` and `@google/gemini-cli` is transpiled into
  standard JavaScript using the TypeScript Compiler (`tsc`). The resulting
  `dist/` directory is what gets published in the NPM package. This is a
  standard approach for TypeScript libraries.

- **GitHub `npx` execution:** When running the latest version of Gemini CLI
  directly from GitHub, a different process is triggered by the `prepare` script
  in `package.json`. This script uses `esbuild` to bundle the entire application
  and its dependencies into a single, self-contained JavaScript file. This
  bundle is created on-the-fly on the user's machine and is not checked into the
  repository.

**Docker sandbox image**

The Docker-based execution method is supported by the `gemini-cli-sandbox`
container image. This image is published to a container registry and contains a
pre-installed, global version of Gemini CLI.

## Release process

The release process is automated through GitHub Actions. The release workflow
performs the following actions:

1.  Build the NPM packages using `tsc`.
2.  Publish the NPM packages to the artifact registry.
3.  Create GitHub releases with bundled assets.


# Gemini CLI authentication setup

To use Gemini CLI, you'll need to authenticate with Google. This guide helps you
quickly find the best way to sign in based on your account type and how you're
using the CLI.

For most users, we recommend starting Gemini CLI and logging in with your
personal Google account.

## Choose your authentication method <a id="auth-methods"></a>

Select the authentication method that matches your situation in the table below:

| User Type / Scenario                                                   | Recommended Authentication Method                                | Google Cloud Project Required                               |
| :--------------------------------------------------------------------- | :--------------------------------------------------------------- | :---------------------------------------------------------- |
| Individual Google accounts                                             | [Login with Google](#login-google)                               | No, with exceptions                                         |
| Organization users with a company, school, or Google Workspace account | [Login with Google](#login-google)                               | [Yes](#set-gcp)                                             |
| AI Studio user with a Gemini API key                                   | [Use Gemini API Key](#gemini-api)                                | No                                                          |
| Google Cloud Vertex AI user                                            | [Vertex AI](#vertex-ai)                                          | [Yes](#set-gcp)                                             |
| [Headless mode](#headless)                                             | [Use Gemini API Key](#gemini-api) or<br> [Vertex AI](#vertex-ai) | No (for Gemini API Key)<br> [Yes](#set-gcp) (for Vertex AI) |

### What is my Google account type?

- **Individual Google accounts:** Includes all
  [free tier accounts](/docs/quota-and-pricing#free-usage) such as Gemini Code
  Assist for individuals, as well as paid subscriptions for
  [Google AI Pro and Ultra](https://gemini.google/subscriptions/).

- **Organization accounts:** Accounts using paid licenses through an
  organization such as a company, school, or
  [Google Workspace](https://workspace.google.com/). Includes
  [Google AI Ultra for Business](https://support.google.com/a/answer/16345165)
  subscriptions.

## (Recommended) Login with Google <a id="login-google"></a>

If you run Gemini CLI on your local machine, the simplest authentication method
is logging in with your Google account. This method requires a web browser on a
machine that can communicate with the terminal running Gemini CLI (e.g., your
local machine).

> **Important:** If you are a **Google AI Pro** or **Google AI Ultra**
> subscriber, use the Google account associated with your subscription.

To authenticate and use Gemini CLI:

1. Start the CLI:

   ```bash
   gemini
   ```

2. Select **Login with Google**. Gemini CLI opens a login prompt using your web
   browser. Follow the on-screen instructions. Your credentials will be cached
   locally for future sessions.

### Do I need to set my Google Cloud project?

Most individual Google accounts (free and paid) don't require a Google Cloud
project for authentication. However, you'll need to set a Google Cloud project
when you meet at least one of the following conditions:

- You are using a company, school, or Google Workspace account.
- You are using a Gemini Code Assist license from the Google Developer Program.
- You are using a license from a Gemini Code Assist subscription.

For instructions, see [Set your Google Cloud Project](#set-gcp).

## Use Gemini API key <a id="gemini-api"></a>

If you don't want to authenticate using your Google account, you can use an API
key from Google AI Studio.

To authenticate and use Gemini CLI with a Gemini API key:

1. Obtain your API key from
   [Google AI Studio](https://aistudio.google.com/app/apikey).

2. Set the `GEMINI_API_KEY` environment variable to your key. For example:

   ```bash
   # Replace YOUR_GEMINI_API_KEY with the key from AI Studio
   export GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
   ```

   To make this setting persistent, see
   [Persisting Environment Variables](#persisting-vars).

3. Start the CLI:

   ```bash
   gemini
   ```

4. Select **Use Gemini API key**.

> **Warning:** Treat API keys, especially for services like Gemini, as sensitive
> credentials. Protect them to prevent unauthorized access and potential misuse
> of the service under your account.

## Use Vertex AI <a id="vertex-ai"></a>

To use Gemini CLI with Google Cloud's Vertex AI platform, choose from the
following authentication options:

- A. Application Default Credentials (ADC) using `gcloud`.
- B. Service account JSON key.
- C. Google Cloud API key.

Regardless of your authentication method for Vertex AI, you'll need to set
`GOOGLE_CLOUD_PROJECT` to your Google Cloud project ID with the Vertex AI API
enabled, and `GOOGLE_CLOUD_LOCATION` to the location of your Vertex AI resources
or the location where you want to run your jobs.

For example:

```bash
# Replace with your project ID and desired location (e.g., us-central1)
export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
export GOOGLE_CLOUD_LOCATION="YOUR_PROJECT_LOCATION"
```

To make any Vertex AI environment variable settings persistent, see
[Persisting Environment Variables](#persisting-vars).

#### A. Vertex AI - application default credentials (ADC) using `gcloud`

Consider this authentication method if you have Google Cloud CLI installed.

> **Note:** If you have previously set `GOOGLE_API_KEY` or `GEMINI_API_KEY`, you
> must unset them to use ADC:
>
> ```bash
> unset GOOGLE_API_KEY GEMINI_API_KEY
> ```

1. Verify you have a Google Cloud project and Vertex AI API is enabled.

2. Log in to Google Cloud:

   ```bash
   gcloud auth application-default login
   ```

3. [Configure your Google Cloud Project](#set-gcp).

4. Start the CLI:

   ```bash
   gemini
   ```

5. Select **Vertex AI**.

#### B. Vertex AI - service account JSON key

Consider this method of authentication in non-interactive environments, CI/CD
pipelines, or if your organization restricts user-based ADC or API key creation.

> **Note:** If you have previously set `GOOGLE_API_KEY` or `GEMINI_API_KEY`, you
> must unset them:
>
> ```bash
> unset GOOGLE_API_KEY GEMINI_API_KEY
> ```

1.  [Create a service account and key](https://cloud.google.com/iam/docs/keys-create-delete)
    and download the provided JSON file. Assign the "Vertex AI User" role to the
    service account.

2.  Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to the JSON
    file's absolute path. For example:

    ```bash
    # Replace /path/to/your/keyfile.json with the actual path
    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/keyfile.json"
    ```

3.  [Configure your Google Cloud Project](#set-gcp).

4.  Start the CLI:

    ```bash
    gemini
    ```

5.  Select **Vertex AI**.
    > **Warning:** Protect your service account key file as it gives access to
    > your resources.

#### C. Vertex AI - Google Cloud API key

1.  Obtain a Google Cloud API key:
    [Get an API Key](https://cloud.google.com/vertex-ai/generative-ai/docs/start/api-keys?usertype=newuser).

2.  Set the `GOOGLE_API_KEY` environment variable:

    ```bash
    # Replace YOUR_GOOGLE_API_KEY with your Vertex AI API key
    export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"
    ```

    > **Note:** If you see errors like
    > `"API keys are not supported by this API..."`, your organization might
    > restrict API key usage for this service. Try the other Vertex AI
    > authentication methods instead.

3.  [Configure your Google Cloud Project](#set-gcp).

4.  Start the CLI:

    ```bash
    gemini
    ```

5.  Select **Vertex AI**.

## Set your Google Cloud project <a id="set-gcp"></a>

> **Important:** Most individual Google accounts (free and paid) don't require a
> Google Cloud project for authentication.

When you sign in using your Google account, you may need to configure a Google
Cloud project for Gemini CLI to use. This applies when you meet at least one of
the following conditions:

- You are using a Company, School, or Google Workspace account.
- You are using a Gemini Code Assist license from the Google Developer Program.
- You are using a license from a Gemini Code Assist subscription.

To configure Gemini CLI to use a Google Cloud project, do the following:

1.  [Find your Google Cloud Project ID](https://support.google.com/googleapi/answer/7014113).

2.  [Enable the Gemini for Cloud API](https://cloud.google.com/gemini/docs/discover/set-up-gemini#enable-api).

3.  [Configure necessary IAM access permissions](https://cloud.google.com/gemini/docs/discover/set-up-gemini#grant-iam).

4.  Configure your environment variables. Set either the `GOOGLE_CLOUD_PROJECT`
    or `GOOGLE_CLOUD_PROJECT_ID` variable to the project ID to use with Gemini
    CLI. Gemini CLI checks for `GOOGLE_CLOUD_PROJECT` first, then falls back to
    `GOOGLE_CLOUD_PROJECT_ID`.

    For example, to set the `GOOGLE_CLOUD_PROJECT_ID` variable:

    ```bash
    # Replace YOUR_PROJECT_ID with your actual Google Cloud project ID
    export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"
    ```

    To make this setting persistent, see
    [Persisting Environment Variables](#persisting-vars).

## Persisting environment variables <a id="persisting-vars"></a>

To avoid setting environment variables for every terminal session, you can
persist them with the following methods:

1.  **Add your environment variables to your shell configuration file:** Append
    the `export ...` commands to your shell's startup file (e.g., `~/.bashrc`,
    `~/.zshrc`, or `~/.profile`) and reload your shell (e.g.,
    `source ~/.bashrc`).

    ```bash
    # Example for .bashrc
    echo 'export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"' >> ~/.bashrc
    source ~/.bashrc
    ```

    > **Warning:** Be aware that when you export API keys or service account
    > paths in your shell configuration file, any process launched from that
    > shell can read them.

2.  **Use a `.env` file:** Create a `.gemini/.env` file in your project
    directory or home directory. Gemini CLI automatically loads variables from
    the first `.env` file it finds, searching up from the current directory,
    then in `~/.gemini/.env` or `~/.env`. `.gemini/.env` is recommended.

    Example for user-wide settings:

    ```bash
    mkdir -p ~/.gemini
    cat >> ~/.gemini/.env <<'EOF'
    GOOGLE_CLOUD_PROJECT="your-project-id"
    # Add other variables like GEMINI_API_KEY as needed
    EOF
    ```

Variables are loaded from the first file found, not merged.

## Running in Google Cloud environments <a id="cloud-env"></a>

When running Gemini CLI within certain Google Cloud environments, authentication
is automatic.

In a Google Cloud Shell environment, Gemini CLI typically authenticates
automatically using your Cloud Shell credentials. In Compute Engine
environments, Gemini CLI automatically uses Application Default Credentials
(ADC) from the environment's metadata server.

If automatic authentication fails, use one of the interactive methods described
on this page.

## Running in headless mode <a id="headless"></a>

[Headless mode](/docs/cli/headless) will use your existing authentication method,
if an existing authentication credential is cached.

If you have not already logged in with an authentication credential, you must
configure authentication using environment variables:

- [Use Gemini API Key](#gemini-api)
- [Vertex AI](#vertex-ai)

## What's next?

Your authentication method affects your quotas, pricing, Terms of Service, and
privacy notices. Review the following pages to learn more:

- [Gemini CLI: Quotas and Pricing](/docs/quota-and-pricing).
- [Gemini CLI: Terms of Service and Privacy Notice](/docs/tos-privacy).


# Gemini CLI configuration

> **Note on configuration format, 9/17/25:** The format of the `settings.json`
> file has been updated to a new, more organized structure.
>
> - The new format will be supported in the stable release starting
>   **[09/10/25]**.
> - Automatic migration from the old format to the new format will begin on
>   **[09/17/25]**.
>
> For details on the previous format, please see the
> [v1 Configuration documentation](/docs/get-started/configuration-v1).

Gemini CLI offers several ways to configure its behavior, including environment
variables, command-line arguments, and settings files. This document outlines
the different configuration methods and available settings.

## Configuration layers

Configuration is applied in the following order of precedence (lower numbers are
overridden by higher numbers):

1.  **Default values:** Hardcoded defaults within the application.
2.  **System defaults file:** System-wide default settings that can be
    overridden by other settings files.
3.  **User settings file:** Global settings for the current user.
4.  **Project settings file:** Project-specific settings.
5.  **System settings file:** System-wide settings that override all other
    settings files.
6.  **Environment variables:** System-wide or session-specific variables,
    potentially loaded from `.env` files.
7.  **Command-line arguments:** Values passed when launching the CLI.

## Settings files

Gemini CLI uses JSON settings files for persistent configuration. There are four
locations for these files:

> **Tip:** JSON-aware editors can use autocomplete and validation by pointing to
> the generated schema at `schemas/settings.schema.json` in this repository.
> When working outside the repo, reference the hosted schema at
> `https://raw.githubusercontent.com/google-gemini/gemini-cli/main/schemas/settings.schema.json`.

- **System defaults file:**
  - **Location:** `/etc/gemini-cli/system-defaults.json` (Linux),
    `C:\ProgramData\gemini-cli\system-defaults.json` (Windows) or
    `/Library/Application Support/GeminiCli/system-defaults.json` (macOS). The
    path can be overridden using the `GEMINI_CLI_SYSTEM_DEFAULTS_PATH`
    environment variable.
  - **Scope:** Provides a base layer of system-wide default settings. These
    settings have the lowest precedence and are intended to be overridden by
    user, project, or system override settings.
- **User settings file:**
  - **Location:** `~/.gemini/settings.json` (where `~` is your home directory).
  - **Scope:** Applies to all Gemini CLI sessions for the current user. User
    settings override system defaults.
- **Project settings file:**
  - **Location:** `.gemini/settings.json` within your project's root directory.
  - **Scope:** Applies only when running Gemini CLI from that specific project.
    Project settings override user settings and system defaults.
- **System settings file:**
  - **Location:** `/etc/gemini-cli/settings.json` (Linux),
    `C:\ProgramData\gemini-cli\settings.json` (Windows) or
    `/Library/Application Support/GeminiCli/settings.json` (macOS). The path can
    be overridden using the `GEMINI_CLI_SYSTEM_SETTINGS_PATH` environment
    variable.
  - **Scope:** Applies to all Gemini CLI sessions on the system, for all users.
    System settings act as overrides, taking precedence over all other settings
    files. May be useful for system administrators at enterprises to have
    controls over users' Gemini CLI setups.

**Note on environment variables in settings:** String values within your
`settings.json` and `gemini-extension.json` files can reference environment
variables using either `$VAR_NAME` or `${VAR_NAME}` syntax. These variables will
be automatically resolved when the settings are loaded. For example, if you have
an environment variable `MY_API_TOKEN`, you could use it in `settings.json` like
this: `"apiKey": "$MY_API_TOKEN"`. Additionally, each extension can have its own
`.env` file in its directory, which will be loaded automatically.

> **Note for Enterprise Users:** For guidance on deploying and managing Gemini
> CLI in a corporate environment, please see the
> [Enterprise Configuration](/docs/cli/enterprise) documentation.

### The `.gemini` directory in your project

In addition to a project settings file, a project's `.gemini` directory can
contain other project-specific files related to Gemini CLI's operation, such as:

- [Custom sandbox profiles](#sandboxing) (e.g.,
  `.gemini/sandbox-macos-custom.sb`, `.gemini/sandbox.Dockerfile`).

### Available settings in `settings.json`

Settings are organized into categories. All settings should be placed within
their corresponding top-level category object in your `settings.json` file.

<!-- SETTINGS-AUTOGEN:START -->

#### `general`

- **`general.previewFeatures`** (boolean):
  - **Description:** Enable preview features (e.g., preview models).
  - **Default:** `false`

- **`general.preferredEditor`** (string):
  - **Description:** The preferred editor to open files in.
  - **Default:** `undefined`

- **`general.vimMode`** (boolean):
  - **Description:** Enable Vim keybindings
  - **Default:** `false`

- **`general.disableAutoUpdate`** (boolean):
  - **Description:** Disable automatic updates
  - **Default:** `false`

- **`general.disableUpdateNag`** (boolean):
  - **Description:** Disable update notification prompts.
  - **Default:** `false`

- **`general.checkpointing.enabled`** (boolean):
  - **Description:** Enable session checkpointing for recovery
  - **Default:** `false`
  - **Requires restart:** Yes

- **`general.enablePromptCompletion`** (boolean):
  - **Description:** Enable AI-powered prompt completion suggestions while
    typing.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`general.retryFetchErrors`** (boolean):
  - **Description:** Retry on "exception TypeError: fetch failed sending
    request" errors.
  - **Default:** `false`

- **`general.debugKeystrokeLogging`** (boolean):
  - **Description:** Enable debug logging of keystrokes to the console.
  - **Default:** `false`

- **`general.sessionRetention.enabled`** (boolean):
  - **Description:** Enable automatic session cleanup
  - **Default:** `false`

- **`general.sessionRetention.maxAge`** (string):
  - **Description:** Maximum age of sessions to keep (e.g., "30d", "7d", "24h",
    "1w")
  - **Default:** `undefined`

- **`general.sessionRetention.maxCount`** (number):
  - **Description:** Alternative: Maximum number of sessions to keep (most
    recent)
  - **Default:** `undefined`

- **`general.sessionRetention.minRetention`** (string):
  - **Description:** Minimum retention period (safety limit, defaults to "1d")
  - **Default:** `"1d"`

#### `output`

- **`output.format`** (enum):
  - **Description:** The format of the CLI output. Can be `text` or `json`.
  - **Default:** `"text"`
  - **Values:** `"text"`, `"json"`

#### `ui`

- **`ui.theme`** (string):
  - **Description:** The color theme for the UI. See the CLI themes guide for
    available options.
  - **Default:** `undefined`

- **`ui.customThemes`** (object):
  - **Description:** Custom theme definitions.
  - **Default:** `{}`

- **`ui.hideWindowTitle`** (boolean):
  - **Description:** Hide the window title bar
  - **Default:** `false`
  - **Requires restart:** Yes

- **`ui.showStatusInTitle`** (boolean):
  - **Description:** Show Gemini CLI status and thoughts in the terminal window
    title
  - **Default:** `false`

- **`ui.showHomeDirectoryWarning`** (boolean):
  - **Description:** Show a warning when running Gemini CLI in the home
    directory.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`ui.hideTips`** (boolean):
  - **Description:** Hide helpful tips in the UI
  - **Default:** `false`

- **`ui.hideBanner`** (boolean):
  - **Description:** Hide the application banner
  - **Default:** `false`

- **`ui.hideContextSummary`** (boolean):
  - **Description:** Hide the context summary (GEMINI.md, MCP servers) above the
    input.
  - **Default:** `false`

- **`ui.footer.hideCWD`** (boolean):
  - **Description:** Hide the current working directory path in the footer.
  - **Default:** `false`

- **`ui.footer.hideSandboxStatus`** (boolean):
  - **Description:** Hide the sandbox status indicator in the footer.
  - **Default:** `false`

- **`ui.footer.hideModelInfo`** (boolean):
  - **Description:** Hide the model name and context usage in the footer.
  - **Default:** `false`

- **`ui.footer.hideContextPercentage`** (boolean):
  - **Description:** Hides the context window remaining percentage.
  - **Default:** `true`

- **`ui.hideFooter`** (boolean):
  - **Description:** Hide the footer from the UI
  - **Default:** `false`

- **`ui.showMemoryUsage`** (boolean):
  - **Description:** Display memory usage information in the UI
  - **Default:** `false`

- **`ui.showLineNumbers`** (boolean):
  - **Description:** Show line numbers in the chat.
  - **Default:** `true`

- **`ui.showCitations`** (boolean):
  - **Description:** Show citations for generated text in the chat.
  - **Default:** `false`

- **`ui.showModelInfoInChat`** (boolean):
  - **Description:** Show the model name in the chat for each model turn.
  - **Default:** `false`

- **`ui.useFullWidth`** (boolean):
  - **Description:** Use the entire width of the terminal for output.
  - **Default:** `true`

- **`ui.useAlternateBuffer`** (boolean):
  - **Description:** Use an alternate screen buffer for the UI, preserving shell
    history.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`ui.incrementalRendering`** (boolean):
  - **Description:** Enable incremental rendering for the UI. This option will
    reduce flickering but may cause rendering artifacts. Only supported when
    useAlternateBuffer is enabled.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`ui.customWittyPhrases`** (array):
  - **Description:** Custom witty phrases to display during loading. When
    provided, the CLI cycles through these instead of the defaults.
  - **Default:** `[]`

- **`ui.accessibility.disableLoadingPhrases`** (boolean):
  - **Description:** Disable loading phrases for accessibility
  - **Default:** `false`
  - **Requires restart:** Yes

- **`ui.accessibility.screenReader`** (boolean):
  - **Description:** Render output in plain-text to be more screen reader
    accessible
  - **Default:** `false`
  - **Requires restart:** Yes

#### `ide`

- **`ide.enabled`** (boolean):
  - **Description:** Enable IDE integration mode.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`ide.hasSeenNudge`** (boolean):
  - **Description:** Whether the user has seen the IDE integration nudge.
  - **Default:** `false`

#### `privacy`

- **`privacy.usageStatisticsEnabled`** (boolean):
  - **Description:** Enable collection of usage statistics
  - **Default:** `true`
  - **Requires restart:** Yes

#### `model`

- **`model.name`** (string):
  - **Description:** The Gemini model to use for conversations.
  - **Default:** `undefined`

- **`model.maxSessionTurns`** (number):
  - **Description:** Maximum number of user/model/tool turns to keep in a
    session. -1 means unlimited.
  - **Default:** `-1`

- **`model.summarizeToolOutput`** (object):
  - **Description:** Enables or disables summarization of tool output. Configure
    per-tool token budgets (for example {"run_shell_command": {"tokenBudget":
    2000}}). Currently only the run_shell_command tool supports summarization.
  - **Default:** `undefined`

- **`model.compressionThreshold`** (number):
  - **Description:** The fraction of context usage at which to trigger context
    compression (e.g. 0.2, 0.3).
  - **Default:** `0.5`
  - **Requires restart:** Yes

- **`model.skipNextSpeakerCheck`** (boolean):
  - **Description:** Skip the next speaker check.
  - **Default:** `true`

#### `modelConfigs`

- **`modelConfigs.aliases`** (object):
  - **Description:** Named presets for model configs. Can be used in place of a
    model name and can inherit from other aliases using an `extends` property.
  - **Default:**

    ```json
    {
      "base": {
        "modelConfig": {
          "generateContentConfig": {
            "temperature": 0,
            "topP": 1
          }
        }
      },
      "chat-base": {
        "extends": "base",
        "modelConfig": {
          "generateContentConfig": {
            "thinkingConfig": {
              "includeThoughts": true
            },
            "temperature": 1,
            "topP": 0.95,
            "topK": 64
          }
        }
      },
      "chat-base-2.5": {
        "extends": "chat-base",
        "modelConfig": {
          "generateContentConfig": {
            "thinkingConfig": {
              "thinkingBudget": 8192
            }
          }
        }
      },
      "chat-base-3": {
        "extends": "chat-base",
        "modelConfig": {
          "generateContentConfig": {
            "thinkingConfig": {
              "thinkingLevel": "HIGH"
            }
          }
        }
      },
      "gemini-3-pro-preview": {
        "extends": "chat-base-3",
        "modelConfig": {
          "model": "gemini-3-pro-preview"
        }
      },
      "gemini-3-flash-preview": {
        "extends": "chat-base-3",
        "modelConfig": {
          "model": "gemini-3-flash-preview"
        }
      },
      "gemini-2.5-pro": {
        "extends": "chat-base-2.5",
        "modelConfig": {
          "model": "gemini-2.5-pro"
        }
      },
      "gemini-2.5-flash": {
        "extends": "chat-base-2.5",
        "modelConfig": {
          "model": "gemini-2.5-flash"
        }
      },
      "gemini-2.5-flash-lite": {
        "extends": "chat-base-2.5",
        "modelConfig": {
          "model": "gemini-2.5-flash-lite"
        }
      },
      "gemini-2.5-flash-base": {
        "extends": "base",
        "modelConfig": {
          "model": "gemini-2.5-flash"
        }
      },
      "classifier": {
        "extends": "base",
        "modelConfig": {
          "model": "gemini-2.5-flash-lite",
          "generateContentConfig": {
            "maxOutputTokens": 1024,
            "thinkingConfig": {
              "thinkingBudget": 512
            }
          }
        }
      },
      "prompt-completion": {
        "extends": "base",
        "modelConfig": {
          "model": "gemini-2.5-flash-lite",
          "generateContentConfig": {
            "temperature": 0.3,
            "maxOutputTokens": 16000,
            "thinkingConfig": {
              "thinkingBudget": 0
            }
          }
        }
      },
      "edit-corrector": {
        "extends": "base",
        "modelConfig": {
          "model": "gemini-2.5-flash-lite",
          "generateContentConfig": {
            "thinkingConfig": {
              "thinkingBudget": 0
            }
          }
        }
      },
      "summarizer-default": {
        "extends": "base",
        "modelConfig": {
          "model": "gemini-2.5-flash-lite",
          "generateContentConfig": {
            "maxOutputTokens": 2000
          }
        }
      },
      "summarizer-shell": {
        "extends": "base",
        "modelConfig": {
          "model": "gemini-2.5-flash-lite",
          "generateContentConfig": {
            "maxOutputTokens": 2000
          }
        }
      },
      "web-search": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {
          "generateContentConfig": {
            "tools": [
              {
                "googleSearch": {}
              }
            ]
          }
        }
      },
      "web-fetch": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {
          "generateContentConfig": {
            "tools": [
              {
                "urlContext": {}
              }
            ]
          }
        }
      },
      "web-fetch-fallback": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "loop-detection": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "loop-detection-double-check": {
        "extends": "base",
        "modelConfig": {
          "model": "gemini-2.5-pro"
        }
      },
      "llm-edit-fixer": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "next-speaker-checker": {
        "extends": "gemini-2.5-flash-base",
        "modelConfig": {}
      },
      "chat-compression-3-pro": {
        "modelConfig": {
          "model": "gemini-3-pro-preview"
        }
      },
      "chat-compression-3-flash": {
        "modelConfig": {
          "model": "gemini-3-flash-preview"
        }
      },
      "chat-compression-2.5-pro": {
        "modelConfig": {
          "model": "gemini-2.5-pro"
        }
      },
      "chat-compression-2.5-flash": {
        "modelConfig": {
          "model": "gemini-2.5-flash"
        }
      },
      "chat-compression-2.5-flash-lite": {
        "modelConfig": {
          "model": "gemini-2.5-flash-lite"
        }
      },
      "chat-compression-default": {
        "modelConfig": {
          "model": "gemini-2.5-pro"
        }
      }
    }
    ```

- **`modelConfigs.customAliases`** (object):
  - **Description:** Custom named presets for model configs. These are merged
    with (and override) the built-in aliases.
  - **Default:** `{}`

- **`modelConfigs.customOverrides`** (array):
  - **Description:** Custom model config overrides. These are merged with (and
    added to) the built-in overrides.
  - **Default:** `[]`

- **`modelConfigs.overrides`** (array):
  - **Description:** Apply specific configuration overrides based on matches,
    with a primary key of model (or alias). The most specific match will be
    used.
  - **Default:** `[]`

#### `context`

- **`context.fileName`** (string | string[]):
  - **Description:** The name of the context file or files to load into memory.
    Accepts either a single string or an array of strings.
  - **Default:** `undefined`

- **`context.importFormat`** (string):
  - **Description:** The format to use when importing memory.
  - **Default:** `undefined`

- **`context.discoveryMaxDirs`** (number):
  - **Description:** Maximum number of directories to search for memory.
  - **Default:** `200`

- **`context.includeDirectories`** (array):
  - **Description:** Additional directories to include in the workspace context.
    Missing directories will be skipped with a warning.
  - **Default:** `[]`

- **`context.loadMemoryFromIncludeDirectories`** (boolean):
  - **Description:** Controls how /memory refresh loads GEMINI.md files. When
    true, include directories are scanned; when false, only the current
    directory is used.
  - **Default:** `false`

- **`context.fileFiltering.respectGitIgnore`** (boolean):
  - **Description:** Respect .gitignore files when searching.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`context.fileFiltering.respectGeminiIgnore`** (boolean):
  - **Description:** Respect .geminiignore files when searching.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`context.fileFiltering.enableRecursiveFileSearch`** (boolean):
  - **Description:** Enable recursive file search functionality when completing
    @ references in the prompt.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`context.fileFiltering.disableFuzzySearch`** (boolean):
  - **Description:** Disable fuzzy search when searching for files.
  - **Default:** `false`
  - **Requires restart:** Yes

#### `tools`

- **`tools.sandbox`** (boolean | string):
  - **Description:** Sandbox execution environment. Set to a boolean to enable
    or disable the sandbox, or provide a string path to a sandbox profile.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`tools.shell.enableInteractiveShell`** (boolean):
  - **Description:** Use node-pty for an interactive shell experience. Fallback
    to child_process still applies.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`tools.shell.pager`** (string):
  - **Description:** The pager command to use for shell output. Defaults to
    `cat`.
  - **Default:** `"cat"`

- **`tools.shell.showColor`** (boolean):
  - **Description:** Show color in shell output.
  - **Default:** `false`

- **`tools.shell.inactivityTimeout`** (number):
  - **Description:** The maximum time in seconds allowed without output from the
    shell command. Defaults to 5 minutes.
  - **Default:** `300`

- **`tools.shell.enableShellOutputEfficiency`** (boolean):
  - **Description:** Enable shell output efficiency optimizations for better
    performance.
  - **Default:** `true`

- **`tools.autoAccept`** (boolean):
  - **Description:** Automatically accept and execute tool calls that are
    considered safe (e.g., read-only operations).
  - **Default:** `false`

- **`tools.core`** (array):
  - **Description:** Restrict the set of built-in tools with an allowlist. Match
    semantics mirror tools.allowed; see the built-in tools documentation for
    available names.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`tools.allowed`** (array):
  - **Description:** Tool names that bypass the confirmation dialog. Useful for
    trusted commands (for example ["run_shell_command(git)",
    "run_shell_command(npm test)"]). See shell tool command restrictions for
    matching details.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`tools.exclude`** (array):
  - **Description:** Tool names to exclude from discovery.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`tools.discoveryCommand`** (string):
  - **Description:** Command to run for tool discovery.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`tools.callCommand`** (string):
  - **Description:** Defines a custom shell command for invoking discovered
    tools. The command must take the tool name as the first argument, read JSON
    arguments from stdin, and emit JSON results on stdout.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`tools.useRipgrep`** (boolean):
  - **Description:** Use ripgrep for file content search instead of the fallback
    implementation. Provides faster search performance.
  - **Default:** `true`

- **`tools.enableToolOutputTruncation`** (boolean):
  - **Description:** Enable truncation of large tool outputs.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`tools.truncateToolOutputThreshold`** (number):
  - **Description:** Truncate tool output if it is larger than this many
    characters. Set to -1 to disable.
  - **Default:** `4000000`
  - **Requires restart:** Yes

- **`tools.truncateToolOutputLines`** (number):
  - **Description:** The number of lines to keep when truncating tool output.
  - **Default:** `1000`
  - **Requires restart:** Yes

- **`tools.enableHooks`** (boolean):
  - **Description:** Enables the hooks system experiment. When disabled, the
    hooks system is completely deactivated regardless of other settings.
  - **Default:** `true`
  - **Requires restart:** Yes

#### `mcp`

- **`mcp.serverCommand`** (string):
  - **Description:** Command to start an MCP server.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`mcp.allowed`** (array):
  - **Description:** A list of MCP servers to allow.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`mcp.excluded`** (array):
  - **Description:** A list of MCP servers to exclude.
  - **Default:** `undefined`
  - **Requires restart:** Yes

#### `useWriteTodos`

- **`useWriteTodos`** (boolean):
  - **Description:** Enable the write_todos tool.
  - **Default:** `true`

#### `security`

- **`security.disableYoloMode`** (boolean):
  - **Description:** Disable YOLO mode, even if enabled by a flag.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`security.enablePermanentToolApproval`** (boolean):
  - **Description:** Enable the "Allow for all future sessions" option in tool
    confirmation dialogs.
  - **Default:** `false`

- **`security.blockGitExtensions`** (boolean):
  - **Description:** Blocks installing and loading extensions from Git.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`security.folderTrust.enabled`** (boolean):
  - **Description:** Setting to track whether Folder trust is enabled.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`security.environmentVariableRedaction.allowed`** (array):
  - **Description:** Environment variables to always allow (bypass redaction).
  - **Default:** `[]`
  - **Requires restart:** Yes

- **`security.environmentVariableRedaction.blocked`** (array):
  - **Description:** Environment variables to always redact.
  - **Default:** `[]`
  - **Requires restart:** Yes

- **`security.environmentVariableRedaction.enabled`** (boolean):
  - **Description:** Enable redaction of environment variables that may contain
    secrets.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`security.auth.selectedType`** (string):
  - **Description:** The currently selected authentication type.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`security.auth.enforcedType`** (string):
  - **Description:** The required auth type. If this does not match the selected
    auth type, the user will be prompted to re-authenticate.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`security.auth.useExternal`** (boolean):
  - **Description:** Whether to use an external authentication flow.
  - **Default:** `undefined`
  - **Requires restart:** Yes

#### `advanced`

- **`advanced.autoConfigureMemory`** (boolean):
  - **Description:** Automatically configure Node.js memory limits
  - **Default:** `false`
  - **Requires restart:** Yes

- **`advanced.dnsResolutionOrder`** (string):
  - **Description:** The DNS resolution order.
  - **Default:** `undefined`
  - **Requires restart:** Yes

- **`advanced.excludedEnvVars`** (array):
  - **Description:** Environment variables to exclude from project context.
  - **Default:**

    ```json
    ["DEBUG", "DEBUG_MODE"]
    ```

- **`advanced.bugCommand`** (object):
  - **Description:** Configuration for the bug report command.
  - **Default:** `undefined`

#### `experimental`

- **`experimental.enableAgents`** (boolean):
  - **Description:** Enable local and remote subagents. Warning: Experimental
    feature, uses YOLO mode for subagents
  - **Default:** `false`
  - **Requires restart:** Yes

- **`experimental.extensionManagement`** (boolean):
  - **Description:** Enable extension management features.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`experimental.extensionReloading`** (boolean):
  - **Description:** Enables extension loading/unloading within the CLI session.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`experimental.jitContext`** (boolean):
  - **Description:** Enable Just-In-Time (JIT) context loading.
  - **Default:** `false`
  - **Requires restart:** Yes

- **`experimental.skills`** (boolean):
  - **Description:** Enable Agent Skills (experimental).
  - **Default:** `false`
  - **Requires restart:** Yes

- **`experimental.codebaseInvestigatorSettings.enabled`** (boolean):
  - **Description:** Enable the Codebase Investigator agent.
  - **Default:** `true`
  - **Requires restart:** Yes

- **`experimental.codebaseInvestigatorSettings.maxNumTurns`** (number):
  - **Description:** Maximum number of turns for the Codebase Investigator
    agent.
  - **Default:** `10`
  - **Requires restart:** Yes

- **`experimental.codebaseInvestigatorSettings.maxTimeMinutes`** (number):
  - **Description:** Maximum time for the Codebase Investigator agent (in
    minutes).
  - **Default:** `3`
  - **Requires restart:** Yes

- **`experimental.codebaseInvestigatorSettings.thinkingBudget`** (number):
  - **Description:** The thinking budget for the Codebase Investigator agent.
  - **Default:** `8192`
  - **Requires restart:** Yes

- **`experimental.codebaseInvestigatorSettings.model`** (string):
  - **Description:** The model to use for the Codebase Investigator agent.
  - **Default:** `"auto"`
  - **Requires restart:** Yes

- **`experimental.useOSC52Paste`** (boolean):
  - **Description:** Use OSC 52 sequence for pasting instead of clipboardy
    (useful for remote sessions).
  - **Default:** `false`

- **`experimental.cliHelpAgentSettings.enabled`** (boolean):
  - **Description:** Enable the CLI Help Agent.
  - **Default:** `true`
  - **Requires restart:** Yes

#### `skills`

- **`skills.disabled`** (array):
  - **Description:** List of disabled skills.
  - **Default:** `[]`
  - **Requires restart:** Yes

#### `hooks`

- **`hooks.enabled`** (boolean):
  - **Description:** Canonical toggle for the hooks system. When disabled, no
    hooks will be executed.
  - **Default:** `false`

- **`hooks.disabled`** (array):
  - **Description:** List of hook names (commands) that should be disabled.
    Hooks in this list will not execute even if configured.
  - **Default:** `[]`

- **`hooks.notifications`** (boolean):
  - **Description:** Show visual indicators when hooks are executing.
  - **Default:** `true`

- **`hooks.BeforeTool`** (array):
  - **Description:** Hooks that execute before tool execution. Can intercept,
    validate, or modify tool calls.
  - **Default:** `[]`

- **`hooks.AfterTool`** (array):
  - **Description:** Hooks that execute after tool execution. Can process
    results, log outputs, or trigger follow-up actions.
  - **Default:** `[]`

- **`hooks.BeforeAgent`** (array):
  - **Description:** Hooks that execute before agent loop starts. Can set up
    context or initialize resources.
  - **Default:** `[]`

- **`hooks.AfterAgent`** (array):
  - **Description:** Hooks that execute after agent loop completes. Can perform
    cleanup or summarize results.
  - **Default:** `[]`

- **`hooks.Notification`** (array):
  - **Description:** Hooks that execute on notification events (errors,
    warnings, info). Can log or alert on specific conditions.
  - **Default:** `[]`

- **`hooks.SessionStart`** (array):
  - **Description:** Hooks that execute when a session starts. Can initialize
    session-specific resources or state.
  - **Default:** `[]`

- **`hooks.SessionEnd`** (array):
  - **Description:** Hooks that execute when a session ends. Can perform cleanup
    or persist session data.
  - **Default:** `[]`

- **`hooks.PreCompress`** (array):
  - **Description:** Hooks that execute before chat history compression. Can
    back up or analyze conversation before compression.
  - **Default:** `[]`

- **`hooks.BeforeModel`** (array):
  - **Description:** Hooks that execute before LLM requests. Can modify prompts,
    inject context, or control model parameters.
  - **Default:** `[]`

- **`hooks.AfterModel`** (array):
  - **Description:** Hooks that execute after LLM responses. Can process
    outputs, extract information, or log interactions.
  - **Default:** `[]`

- **`hooks.BeforeToolSelection`** (array):
  - **Description:** Hooks that execute before tool selection. Can filter or
    prioritize available tools dynamically.
  - **Default:** `[]`

#### `admin`

- **`admin.secureModeEnabled`** (boolean):
  - **Description:** If true, disallows yolo mode from being used.
  - **Default:** `false`

- **`admin.extensions.enabled`** (boolean):
  - **Description:** If false, disallows extensions from being installed or
    used.
  - **Default:** `true`

- **`admin.mcp.enabled`** (boolean):
  - **Description:** If false, disallows MCP servers from being used.
  - **Default:** `true`
  <!-- SETTINGS-AUTOGEN:END -->

#### `mcpServers`

Configures connections to one or more Model-Context Protocol (MCP) servers for
discovering and using custom tools. Gemini CLI attempts to connect to each
configured MCP server to discover available tools. If multiple MCP servers
expose a tool with the same name, the tool names will be prefixed with the
server alias you defined in the configuration (e.g.,
`serverAlias__actualToolName`) to avoid conflicts. Note that the system might
strip certain schema properties from MCP tool definitions for compatibility. At
least one of `command`, `url`, or `httpUrl` must be provided. If multiple are
specified, the order of precedence is `httpUrl`, then `url`, then `command`.

- **`mcpServers.<SERVER_NAME>`** (object): The server parameters for the named
  server.
  - `command` (string, optional): The command to execute to start the MCP server
    via standard I/O.
  - `args` (array of strings, optional): Arguments to pass to the command.
  - `env` (object, optional): Environment variables to set for the server
    process.
  - `cwd` (string, optional): The working directory in which to start the
    server.
  - `url` (string, optional): The URL of an MCP server that uses Server-Sent
    Events (SSE) for communication.
  - `httpUrl` (string, optional): The URL of an MCP server that uses streamable
    HTTP for communication.
  - `headers` (object, optional): A map of HTTP headers to send with requests to
    `url` or `httpUrl`.
  - `timeout` (number, optional): Timeout in milliseconds for requests to this
    MCP server.
  - `trust` (boolean, optional): Trust this server and bypass all tool call
    confirmations.
  - `description` (string, optional): A brief description of the server, which
    may be used for display purposes.
  - `includeTools` (array of strings, optional): List of tool names to include
    from this MCP server. When specified, only the tools listed here will be
    available from this server (allowlist behavior). If not specified, all tools
    from the server are enabled by default.
  - `excludeTools` (array of strings, optional): List of tool names to exclude
    from this MCP server. Tools listed here will not be available to the model,
    even if they are exposed by the server. **Note:** `excludeTools` takes
    precedence over `includeTools` - if a tool is in both lists, it will be
    excluded.

#### `telemetry`

Configures logging and metrics collection for Gemini CLI. For more information,
see [Telemetry](/docs/cli/telemetry).

- **Properties:**
  - **`enabled`** (boolean): Whether or not telemetry is enabled.
  - **`target`** (string): The destination for collected telemetry. Supported
    values are `local` and `gcp`.
  - **`otlpEndpoint`** (string): The endpoint for the OTLP Exporter.
  - **`otlpProtocol`** (string): The protocol for the OTLP Exporter (`grpc` or
    `http`).
  - **`logPrompts`** (boolean): Whether or not to include the content of user
    prompts in the logs.
  - **`outfile`** (string): The file to write telemetry to when `target` is
    `local`.
  - **`useCollector`** (boolean): Whether to use an external OTLP collector.

### Example `settings.json`

Here is an example of a `settings.json` file with the nested structure, new as
of v0.3.0:

```json
{
  "general": {
    "vimMode": true,
    "preferredEditor": "code",
    "sessionRetention": {
      "enabled": true,
      "maxAge": "30d",
      "maxCount": 100
    }
  },
  "ui": {
    "theme": "GitHub",
    "hideBanner": true,
    "hideTips": false,
    "customWittyPhrases": [
      "You forget a thousand things every day. Make sure this is one of ’em",
      "Connecting to AGI"
    ]
  },
  "tools": {
    "sandbox": "docker",
    "discoveryCommand": "bin/get_tools",
    "callCommand": "bin/call_tool",
    "exclude": ["write_file"]
  },
  "mcpServers": {
    "mainServer": {
      "command": "bin/mcp_server.py"
    },
    "anotherServer": {
      "command": "node",
      "args": ["mcp_server.js", "--verbose"]
    }
  },
  "telemetry": {
    "enabled": true,
    "target": "local",
    "otlpEndpoint": "http://localhost:4317",
    "logPrompts": true
  },
  "privacy": {
    "usageStatisticsEnabled": true
  },
  "model": {
    "name": "gemini-1.5-pro-latest",
    "maxSessionTurns": 10,
    "summarizeToolOutput": {
      "run_shell_command": {
        "tokenBudget": 100
      }
    }
  },
  "context": {
    "fileName": ["CONTEXT.md", "GEMINI.md"],
    "includeDirectories": ["path/to/dir1", "~/path/to/dir2", "../path/to/dir3"],
    "loadFromIncludeDirectories": true,
    "fileFiltering": {
      "respectGitIgnore": false
    }
  },
  "advanced": {
    "excludedEnvVars": ["DEBUG", "DEBUG_MODE", "NODE_ENV"]
  }
}
```

## Shell history

The CLI keeps a history of shell commands you run. To avoid conflicts between
different projects, this history is stored in a project-specific directory
within your user's home folder.

- **Location:** `~/.gemini/tmp/<project_hash>/shell_history`
  - `<project_hash>` is a unique identifier generated from your project's root
    path.
  - The history is stored in a file named `shell_history`.

## Environment variables and `.env` files

Environment variables are a common way to configure applications, especially for
sensitive information like API keys or for settings that might change between
environments. For authentication setup, see the
[Authentication documentation](/docs/get-started/authentication) which covers all available
authentication methods.

The CLI automatically loads environment variables from an `.env` file. The
loading order is:

1.  `.env` file in the current working directory.
2.  If not found, it searches upwards in parent directories until it finds an
    `.env` file or reaches the project root (identified by a `.git` folder) or
    the home directory.
3.  If still not found, it looks for `~/.env` (in the user's home directory).

**Environment variable exclusion:** Some environment variables (like `DEBUG` and
`DEBUG_MODE`) are automatically excluded from being loaded from project `.env`
files to prevent interference with gemini-cli behavior. Variables from
`.gemini/.env` files are never excluded. You can customize this behavior using
the `advanced.excludedEnvVars` setting in your `settings.json` file.

- **`GEMINI_API_KEY`**:
  - Your API key for the Gemini API.
  - One of several available [authentication methods](/docs/get-started/authentication).
  - Set this in your shell profile (e.g., `~/.bashrc`, `~/.zshrc`) or an `.env`
    file.
- **`GEMINI_MODEL`**:
  - Specifies the default Gemini model to use.
  - Overrides the hardcoded default
  - Example: `export GEMINI_MODEL="gemini-2.5-flash"`
- **`GOOGLE_API_KEY`**:
  - Your Google Cloud API key.
  - Required for using Vertex AI in express mode.
  - Ensure you have the necessary permissions.
  - Example: `export GOOGLE_API_KEY="YOUR_GOOGLE_API_KEY"`.
- **`GOOGLE_CLOUD_PROJECT`**:
  - Your Google Cloud Project ID.
  - Required for using Code Assist or Vertex AI.
  - If using Vertex AI, ensure you have the necessary permissions in this
    project.
  - **Cloud Shell note:** When running in a Cloud Shell environment, this
    variable defaults to a special project allocated for Cloud Shell users. If
    you have `GOOGLE_CLOUD_PROJECT` set in your global environment in Cloud
    Shell, it will be overridden by this default. To use a different project in
    Cloud Shell, you must define `GOOGLE_CLOUD_PROJECT` in a `.env` file.
  - Example: `export GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"`.
- **`GOOGLE_APPLICATION_CREDENTIALS`** (string):
  - **Description:** The path to your Google Application Credentials JSON file.
  - **Example:**
    `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/credentials.json"`
- **`OTLP_GOOGLE_CLOUD_PROJECT`**:
  - Your Google Cloud Project ID for Telemetry in Google Cloud
  - Example: `export OTLP_GOOGLE_CLOUD_PROJECT="YOUR_PROJECT_ID"`.
- **`GEMINI_TELEMETRY_ENABLED`**:
  - Set to `true` or `1` to enable telemetry. Any other value is treated as
    disabling it.
  - Overrides the `telemetry.enabled` setting.
- **`GEMINI_TELEMETRY_TARGET`**:
  - Sets the telemetry target (`local` or `gcp`).
  - Overrides the `telemetry.target` setting.
- **`GEMINI_TELEMETRY_OTLP_ENDPOINT`**:
  - Sets the OTLP endpoint for telemetry.
  - Overrides the `telemetry.otlpEndpoint` setting.
- **`GEMINI_TELEMETRY_OTLP_PROTOCOL`**:
  - Sets the OTLP protocol (`grpc` or `http`).
  - Overrides the `telemetry.otlpProtocol` setting.
- **`GEMINI_TELEMETRY_LOG_PROMPTS`**:
  - Set to `true` or `1` to enable or disable logging of user prompts. Any other
    value is treated as disabling it.
  - Overrides the `telemetry.logPrompts` setting.
- **`GEMINI_TELEMETRY_OUTFILE`**:
  - Sets the file path to write telemetry to when the target is `local`.
  - Overrides the `telemetry.outfile` setting.
- **`GEMINI_TELEMETRY_USE_COLLECTOR`**:
  - Set to `true` or `1` to enable or disable using an external OTLP collector.
    Any other value is treated as disabling it.
  - Overrides the `telemetry.useCollector` setting.
- **`GOOGLE_CLOUD_LOCATION`**:
  - Your Google Cloud Project Location (e.g., us-central1).
  - Required for using Vertex AI in non-express mode.
  - Example: `export GOOGLE_CLOUD_LOCATION="YOUR_PROJECT_LOCATION"`.
- **`GEMINI_SANDBOX`**:
  - Alternative to the `sandbox` setting in `settings.json`.
  - Accepts `true`, `false`, `docker`, `podman`, or a custom command string.
- **`GEMINI_SYSTEM_MD`**:
  - Replaces the built‑in system prompt with content from a Markdown file.
  - `true`/`1`: Use project default path `./.gemini/system.md`.
  - Any other string: Treat as a path (relative/absolute supported, `~`
    expands).
  - `false`/`0` or unset: Use the built‑in prompt. See
    [System Prompt Override](/docs/cli/system-prompt).
- **`GEMINI_WRITE_SYSTEM_MD`**:
  - Writes the current built‑in system prompt to a file for review.
  - `true`/`1`: Write to `./.gemini/system.md`. Otherwise treat the value as a
    path.
  - Run the CLI once with this set to generate the file.
- **`SEATBELT_PROFILE`** (macOS specific):
  - Switches the Seatbelt (`sandbox-exec`) profile on macOS.
  - `permissive-open`: (Default) Restricts writes to the project folder (and a
    few other folders, see
    `packages/cli/src/utils/sandbox-macos-permissive-open.sb`) but allows other
    operations.
  - `strict`: Uses a strict profile that declines operations by default.
  - `<profile_name>`: Uses a custom profile. To define a custom profile, create
    a file named `sandbox-macos-<profile_name>.sb` in your project's `.gemini/`
    directory (e.g., `my-project/.gemini/sandbox-macos-custom.sb`).
- **`DEBUG` or `DEBUG_MODE`** (often used by underlying libraries or the CLI
  itself):
  - Set to `true` or `1` to enable verbose debug logging, which can be helpful
    for troubleshooting.
  - **Note:** These variables are automatically excluded from project `.env`
    files by default to prevent interference with gemini-cli behavior. Use
    `.gemini/.env` files if you need to set these for gemini-cli specifically.
- **`NO_COLOR`**:
  - Set to any value to disable all color output in the CLI.
- **`CLI_TITLE`**:
  - Set to a string to customize the title of the CLI.
- **`CODE_ASSIST_ENDPOINT`**:
  - Specifies the endpoint for the code assist server.
  - This is useful for development and testing.

### Environment variable redaction

To prevent accidental leakage of sensitive information, Gemini CLI automatically
redacts potential secrets from environment variables when executing tools (such
as shell commands). This "best effort" redaction applies to variables inherited
from the system or loaded from `.env` files.

**Default Redaction Rules:**

- **By Name:** Variables are redacted if their names contain sensitive terms
  like `TOKEN`, `SECRET`, `PASSWORD`, `KEY`, `AUTH`, `CREDENTIAL`, `PRIVATE`, or
  `CERT`.
- **By Value:** Variables are redacted if their values match known secret
  patterns, such as:
  - Private keys (RSA, OpenSSH, PGP, etc.)
  - Certificates
  - URLs containing credentials
  - API keys and tokens (GitHub, Google, AWS, Stripe, Slack, etc.)
- **Specific Blocklist:** Certain variables like `CLIENT_ID`, `DB_URI`,
  `DATABASE_URL`, and `CONNECTION_STRING` are always redacted by default.

**Allowlist (Never Redacted):**

- Common system variables (e.g., `PATH`, `HOME`, `USER`, `SHELL`, `TERM`,
  `LANG`).
- Variables starting with `GEMINI_CLI_`.
- GitHub Action specific variables.

**Configuration:**

You can customize this behavior in your `settings.json` file:

- **`security.allowedEnvironmentVariables`**: A list of variable names to
  _never_ redact, even if they match sensitive patterns.
- **`security.blockedEnvironmentVariables`**: A list of variable names to
  _always_ redact, even if they don't match sensitive patterns.

```json
{
  "security": {
    "allowedEnvironmentVariables": ["MY_PUBLIC_KEY", "NOT_A_SECRET_TOKEN"],
    "blockedEnvironmentVariables": ["INTERNAL_IP_ADDRESS"]
  }
}
```

## Command-line arguments

Arguments passed directly when running the CLI can override other configurations
for that specific session.

- **`--model <model_name>`** (**`-m <model_name>`**):
  - Specifies the Gemini model to use for this session.
  - Example: `npm start -- --model gemini-1.5-pro-latest`
- **`--prompt <your_prompt>`** (**`-p <your_prompt>`**):
  - Used to pass a prompt directly to the command. This invokes Gemini CLI in a
    non-interactive mode.
  - For scripting examples, use the `--output-format json` flag to get
    structured output.
- **`--prompt-interactive <your_prompt>`** (**`-i <your_prompt>`**):
  - Starts an interactive session with the provided prompt as the initial input.
  - The prompt is processed within the interactive session, not before it.
  - Cannot be used when piping input from stdin.
  - Example: `gemini -i "explain this code"`
- **`--output-format <format>`**:
  - **Description:** Specifies the format of the CLI output for non-interactive
    mode.
  - **Values:**
    - `text`: (Default) The standard human-readable output.
    - `json`: A machine-readable JSON output.
    - `stream-json`: A streaming JSON output that emits real-time events.
  - **Note:** For structured output and scripting, use the
    `--output-format json` or `--output-format stream-json` flag.
- **`--sandbox`** (**`-s`**):
  - Enables sandbox mode for this session.
- **`--debug`** (**`-d`**):
  - Enables debug mode for this session, providing more verbose output.

- **`--help`** (or **`-h`**):
  - Displays help information about command-line arguments.
- **`--yolo`**:
  - Enables YOLO mode, which automatically approves all tool calls.
- **`--approval-mode <mode>`**:
  - Sets the approval mode for tool calls. Available modes:
    - `default`: Prompt for approval on each tool call (default behavior)
    - `auto_edit`: Automatically approve edit tools (replace, write_file) while
      prompting for others
    - `yolo`: Automatically approve all tool calls (equivalent to `--yolo`)
  - Cannot be used together with `--yolo`. Use `--approval-mode=yolo` instead of
    `--yolo` for the new unified approach.
  - Example: `gemini --approval-mode auto_edit`
- **`--allowed-tools <tool1,tool2,...>`**:
  - A comma-separated list of tool names that will bypass the confirmation
    dialog.
  - Example: `gemini --allowed-tools "ShellTool(git status)"`
- **`--extensions <extension_name ...>`** (**`-e <extension_name ...>`**):
  - Specifies a list of extensions to use for the session. If not provided, all
    available extensions are used.
  - Use the special term `gemini -e none` to disable all extensions.
  - Example: `gemini -e my-extension -e my-other-extension`
- **`--list-extensions`** (**`-l`**):
  - Lists all available extensions and exits.
- **`--resume [session_id]`** (**`-r [session_id]`**):
  - Resume a previous chat session. Use "latest" for the most recent session,
    provide a session index number, or provide a full session UUID.
  - If no session_id is provided, defaults to "latest".
  - Example: `gemini --resume 5` or `gemini --resume latest` or
    `gemini --resume a1b2c3d4-e5f6-7890-abcd-ef1234567890` or `gemini --resume`
  - See [Session Management](/docs/cli/session-management) for more details.
- **`--list-sessions`**:
  - List all available chat sessions for the current project and exit.
  - Shows session indices, dates, message counts, and preview of first user
    message.
  - Example: `gemini --list-sessions`
- **`--delete-session <identifier>`**:
  - Delete a specific chat session by its index number or full session UUID.
  - Use `--list-sessions` first to see available sessions, their indices, and
    UUIDs.
  - Example: `gemini --delete-session 3` or
    `gemini --delete-session a1b2c3d4-e5f6-7890-abcd-ef1234567890`
- **`--include-directories <dir1,dir2,...>`**:
  - Includes additional directories in the workspace for multi-directory
    support.
  - Can be specified multiple times or as comma-separated values.
  - 5 directories can be added at maximum.
  - Example: `--include-directories /path/to/project1,/path/to/project2` or
    `--include-directories /path/to/project1 --include-directories /path/to/project2`
- **`--screen-reader`**:
  - Enables screen reader mode, which adjusts the TUI for better compatibility
    with screen readers.
- **`--version`**:
  - Displays the version of the CLI.
- **`--experimental-acp`**:
  - Starts the agent in ACP mode.
- **`--allowed-mcp-server-names`**:
  - Allowed MCP server names.
- **`--fake-responses`**:
  - Path to a file with fake model responses for testing.
- **`--record-responses`**:
  - Path to a file to record model responses for testing.

## Context files (hierarchical instructional context)

While not strictly configuration for the CLI's _behavior_, context files
(defaulting to `GEMINI.md` but configurable via the `context.fileName` setting)
are crucial for configuring the _instructional context_ (also referred to as
"memory") provided to the Gemini model. This powerful feature allows you to give
project-specific instructions, coding style guides, or any relevant background
information to the AI, making its responses more tailored and accurate to your
needs. The CLI includes UI elements, such as an indicator in the footer showing
the number of loaded context files, to keep you informed about the active
context.

- **Purpose:** These Markdown files contain instructions, guidelines, or context
  that you want the Gemini model to be aware of during your interactions. The
  system is designed to manage this instructional context hierarchically.

### Example context file content (e.g., `GEMINI.md`)

Here's a conceptual example of what a context file at the root of a TypeScript
project might contain:

```markdown
# Project: My Awesome TypeScript Library

## General Instructions:

- When generating new TypeScript code, please follow the existing coding style.
- Ensure all new functions and classes have JSDoc comments.
- Prefer functional programming paradigms where appropriate.
- All code should be compatible with TypeScript 5.0 and Node.js 20+.

## Coding Style:

- Use 2 spaces for indentation.
- Interface names should be prefixed with `I` (e.g., `IUserService`).
- Private class members should be prefixed with an underscore (`_`).
- Always use strict equality (`===` and `!==`).

## Specific Component: `src/api/client.ts`

- This file handles all outbound API requests.
- When adding new API call functions, ensure they include robust error handling
  and logging.
- Use the existing `fetchWithRetry` utility for all GET requests.

## Regarding Dependencies:

- Avoid introducing new external dependencies unless absolutely necessary.
- If a new dependency is required, please state the reason.
```

This example demonstrates how you can provide general project context, specific
coding conventions, and even notes about particular files or components. The
more relevant and precise your context files are, the better the AI can assist
you. Project-specific context files are highly encouraged to establish
conventions and context.

- **Hierarchical loading and precedence:** The CLI implements a sophisticated
  hierarchical memory system by loading context files (e.g., `GEMINI.md`) from
  several locations. Content from files lower in this list (more specific)
  typically overrides or supplements content from files higher up (more
  general). The exact concatenation order and final context can be inspected
  using the `/memory show` command. The typical loading order is:
  1.  **Global context file:**
      - Location: `~/.gemini/<configured-context-filename>` (e.g.,
        `~/.gemini/GEMINI.md` in your user home directory).
      - Scope: Provides default instructions for all your projects.
  2.  **Project root and ancestors context files:**
      - Location: The CLI searches for the configured context file in the
        current working directory and then in each parent directory up to either
        the project root (identified by a `.git` folder) or your home directory.
      - Scope: Provides context relevant to the entire project or a significant
        portion of it.
  3.  **Sub-directory context files (contextual/local):**
      - Location: The CLI also scans for the configured context file in
        subdirectories _below_ the current working directory (respecting common
        ignore patterns like `node_modules`, `.git`, etc.). The breadth of this
        search is limited to 200 directories by default, but can be configured
        with the `context.discoveryMaxDirs` setting in your `settings.json`
        file.
      - Scope: Allows for highly specific instructions relevant to a particular
        component, module, or subsection of your project.
- **Concatenation and UI indication:** The contents of all found context files
  are concatenated (with separators indicating their origin and path) and
  provided as part of the system prompt to the Gemini model. The CLI footer
  displays the count of loaded context files, giving you a quick visual cue
  about the active instructional context.
- **Importing content:** You can modularize your context files by importing
  other Markdown files using the `@path/to/file.md` syntax. For more details,
  see the [Memory Import Processor documentation](/docs/core/memport).
- **Commands for memory management:**
  - Use `/memory refresh` to force a re-scan and reload of all context files
    from all configured locations. This updates the AI's instructional context.
  - Use `/memory show` to display the combined instructional context currently
    loaded, allowing you to verify the hierarchy and content being used by the
    AI.
  - See the [Commands documentation](/docs/cli/commands#memory) for full details
    on the `/memory` command and its sub-commands (`show` and `refresh`).

By understanding and utilizing these configuration layers and the hierarchical
nature of context files, you can effectively manage the AI's memory and tailor
the Gemini CLI's responses to your specific needs and projects.

## Sandboxing

The Gemini CLI can execute potentially unsafe operations (like shell commands
and file modifications) within a sandboxed environment to protect your system.

Sandboxing is disabled by default, but you can enable it in a few ways:

- Using `--sandbox` or `-s` flag.
- Setting `GEMINI_SANDBOX` environment variable.
- Sandbox is enabled when using `--yolo` or `--approval-mode=yolo` by default.

By default, it uses a pre-built `gemini-cli-sandbox` Docker image.

For project-specific sandboxing needs, you can create a custom Dockerfile at
`.gemini/sandbox.Dockerfile` in your project's root directory. This Dockerfile
can be based on the base sandbox image:

```dockerfile
FROM gemini-cli-sandbox

# Add your custom dependencies or configurations here
# For example:
# RUN apt-get update && apt-get install -y some-package
# COPY ./my-config /app/my-config
```

When `.gemini/sandbox.Dockerfile` exists, you can use `BUILD_SANDBOX`
environment variable when running Gemini CLI to automatically build the custom
sandbox image:

```bash
BUILD_SANDBOX=1 gemini -s
```

## Usage statistics

To help us improve the Gemini CLI, we collect anonymized usage statistics. This
data helps us understand how the CLI is used, identify common issues, and
prioritize new features.

**What we collect:**

- **Tool calls:** We log the names of the tools that are called, whether they
  succeed or fail, and how long they take to execute. We do not collect the
  arguments passed to the tools or any data returned by them.
- **API requests:** We log the Gemini model used for each request, the duration
  of the request, and whether it was successful. We do not collect the content
  of the prompts or responses.
- **Session information:** We collect information about the configuration of the
  CLI, such as the enabled tools and the approval mode.

**What we DON'T collect:**

- **Personally identifiable information (PII):** We do not collect any personal
  information, such as your name, email address, or API keys.
- **Prompt and response content:** We do not log the content of your prompts or
  the responses from the Gemini model.
- **File content:** We do not log the content of any files that are read or
  written by the CLI.

**How to opt out:**

You can opt out of usage statistics collection at any time by setting the
`usageStatisticsEnabled` property to `false` under the `privacy` category in
your `settings.json` file:

```json
{
  "privacy": {
    "usageStatisticsEnabled": false
  }
}
```

# Web search tool (`google_web_search`)

This document describes the `google_web_search` tool.

## Description

Use `google_web_search` to perform a web search using Google Search via the
Gemini API. The `google_web_search` tool returns a summary of web results with
sources.

### Arguments

`google_web_search` takes one argument:

- `query` (string, required): The search query.

## How to use `google_web_search` with the Gemini CLI

The `google_web_search` tool sends a query to the Gemini API, which then
performs a web search. `google_web_search` will return a generated response
based on the search results, including citations and sources.

Usage:

```
google_web_search(query="Your query goes here.")
```

## `google_web_search` examples

Get information on a topic:

```
google_web_search(query="latest advancements in AI-powered code generation")
```

## Important notes

- **Response returned:** The `google_web_search` tool returns a processed
  summary, not a raw list of search results.
- **Citations:** The response includes citations to the sources used to generate
  the summary.

  
# A Guide to Google Search Ranking Systems

Google uses automated ranking systems that look at many factors and signals
about hundreds of billions of web pages and other content in our Search index to
present the most relevant, useful results, all in a fraction of a second. This
page is a guide to understanding some of our more notable ranking systems. It
covers some systems that are part of our core ranking systems, which are the
underlying technologies that produce search results in response to queries. It
also covers some systems involved with specific ranking needs.

## Overview

Our ranking systems are designed to work on the page level, using a variety of
signals and systems to understand how to rank individual pages. Site-wide
signals and classifiers are also used and contribute to our understanding of
pages. Having some good site-wide signals does not mean that all content from a
site will always rank highly, just as having some poor site-wide signals does
not mean all the content from a site will rank poorly.

We regularly improve our ranking systems through rigorous testing and evaluation
and provide notice of updates to our ranking systems when those might be useful
to content creators and others.

You can also visit our
[How Search Works](https://www.google.com/search/howsearchworks/) site to
understand how our ranking systems, combined with other processes, work together
so that Google Search delivers on our mission to organize the world's
information and make it universally accessible and useful.

---

## Active Ranking Systems

### BERT

**Bidirectional Encoder Representations from Transformers (BERT)** is an AI
system Google uses that allows us to understand how combinations of words
express different meanings and intent.

### Crisis Information Systems

Google has developed systems to provide helpful and timely information during
times of crisis, whether those involve personal crisis situations, natural
disasters, or other wide-spread crisis situations:

- **Personal crisis**: Our systems work to understand when people are seeking
  information about personal crisis situations to display hotlines and content
  from trusted organizations for certain queries related to suicide, sexual
  assault, poison ingestion, gender-based violence, or drug addiction.
  [Learn more about how personal crisis information is displayed in Google Search](https://support.google.com/websearch/answer/11181469).
- **SOS Alerts**: During times of natural disasters or wide-spread crisis
  situations, our SOS Alerts system works to show updates from local, national,
  or international authorities. These updates may include emergency phone
  numbers and websites, maps, translations of useful phrases, donation
  opportunities, and more.
  [Learn more about how SOS Alerts work](https://support.google.com/sosalerts/answer/7577464)
  and how they're part of Google's crisis alerts that help in times of floods,
  wildfires, earthquakes, hurricanes, and other disasters.

### Deduplication Systems

Searches on Google may find thousands or even millions of matching web pages.
Some of these may be very similar to each other. In such cases, our systems show
only the most relevant results to avoid unhelpful duplication.
[Learn more about how deduplication works](https://support.google.com/websearch/answer/2466433)
and how to see omitted results if desired, when deduplication happens.

Deduplication also happens with featured snippets. If a web page listing is
elevated to become a featured snippet, we don't repeat the listing later on the
first page of results. This declutters the results and helps people locate
relevant information more easily.

### Exact Match Domain System

Our ranking systems consider the words in domain names as one of many factors to
determine if content is relevant to a search. However, our exact match domain
system works to ensure we don't give too much credit for content hosted under
domains designed to exactly match particular queries. For example, someone might
create a domain name containing the words "best-places-to-eat-lunch" in hopes
all those words in the domain name would propel content high in the rankings.
Our system adjusts for this.

### Freshness Systems

We have various "query deserves freshness" systems designed to show fresher
content for queries where it would be expected. For example:

- If someone is searching about a movie that's just been released, they probably
  want recent reviews rather than older articles from when production began.
- For another example, ordinarily a search for "earthquake" might bring back
  material about preparation and resources. However, if an earthquake happened
  recently, then news articles and fresher content might appear.

### Link Analysis Systems and PageRank

We have various systems that understand how pages link to each other as a way to
determine what pages are about and which might be most helpful in response to a
query. Among these is **PageRank**, one of our core ranking systems used when
Google first launched. Those curious can learn more by reading the
[original PageRank research paper](http://infolab.stanford.edu/~backrub/google.html)
and [patent](https://patents.google.com/patent/US6285999B1/en). How PageRank
works has evolved a lot since then, and it continues to be part of our core
ranking systems.

### Local News Systems

We have systems that work to identify and surface local sources of news whenever
relevant, such as through our "Top stories" and "Local news" features.

### MUM

**Multitask Unified Model (MUM)** is an AI system capable of both understanding
and generating language. It's not currently used for general ranking in Search
but rather for some specific applications such as to improve searches for
COVID-19 vaccine information and to improve featured snippet callouts we
display.

### Neural Matching

Neural matching is an AI system that Google uses to understand representations
of concepts in queries and pages and match them to one another.

### Original Content Systems

We have systems to help ensure we are showing original content prominently in
search results, including original reporting, ahead of those who merely cite it.
This includes support of a special canonical markup creators can use to help us
better understand what is the primary page if a page has been duplicated in
several places.

### Removal-Based Demotion Systems

Google has policies that allow the removal of certain types of content. If we
process a significant volume of such removals involving a particular site, we
use that as a signal to improve our results. In particular:

- **Legal removals**: When we receive a significant volume of valid copyright
  removal requests involving a given site, we are able to use that to demote
  other content from the site in our results. This way, if there is other
  infringing content, people are less likely to encounter it versus the original
  content. We apply similar demotion signals to complaints involving defamation,
  counterfeit goods, and court-ordered removals. In the case of child sexual
  abuse material (CSAM), we always remove such content when it is identified and
  we demote all content from sites with a significant proportion of CSAM
  content.
- **Personal information removals**: If we process a significant volume of
  personal information removals involving a site with exploitative removal
  practices, we demote other content from the site in our results. We also look
  to see if the same pattern of behavior is happening with other sites and, if
  so, apply demotions to content on those sites. We may apply similar demotion
  practices for sites that receive a significant volume of removals of content
  involving doxxing content, explicit personal imagery created or shared without
  consent, or explicit non-consensual fake content.

### Passage Ranking System

Passage ranking is an AI system we use to identify individual sections or
"passages" of a web page to better understand how relevant a page is to a
search.

### RankBrain

RankBrain is an AI system that helps us understand how words are related to
concepts. It means we can better return relevant content even if it doesn't
contain all the exact words used in a search, by understanding the content is
related to other words and concepts.

### Reliable Information Systems

Multiple systems work in various ways to show the most reliable information
possible, such as to help surface more authoritative pages and demote
low-quality content and to elevate quality journalism. In cases where reliable
information might be lacking, our systems automatically display content
advisories about rapidly-changing topics or when our systems don't have high
confidence in the overall quality of the results available for the search. These
provide tips on how to search in ways that might lead to more helpful results.
[Learn more about our approach to delivering high-quality information in Search](https://blog.google/products/search/our-latest-quality-improvements-search/).

### Reviews System

The reviews system aims to better reward high quality reviews, content that
provides insightful analysis and original research, and is written by experts or
enthusiasts who know the topic well.

### Site Diversity System

Our site diversity system works so that we generally won't show more than two
web page listings from the same site in our top results, so that no single site
tends to dominate all the top results. However, we may still show more than two
listings in cases where our systems determine it's especially relevant to do so
for a particular search. Site diversity generally treats subdomains as part of a
root domain. IE: listings from a subdomain (`subdomain.example.com`) and the
root domain (`example.com`) will all be considered from the same single site.
However, sometimes subdomains are treated as separate sites for diversity
purposes when deemed relevant to do so.

### Spam Detection Systems

No one wants their email inbox filled with spam, which is why spam filters are
so helpful. Search faces a similar challenge, because the internet includes huge
amounts of spam that, if not dealt with, would prevent us from showing the most
helpful and relevant results. We employ a range of spam detection systems,
including **SpamBrain**, to deal with content and behaviors that violate our
[spam policies](https://developers.google.com/search/docs/essentials/spam-policies).
These systems are constantly updated to keep up with the latest ways that the
spam threat evolves.

---

## Retired Systems

The following systems are noted for historical purposes. They've either been
incorporated into successor systems or made part of our core ranking systems.

### Helpful Content System

Announced in 2022 as the "Helpful Content Update", this was a system designed to
better ensure people see original, helpful content written by people, for
people, in search results, rather than content made primarily to gain search
engine traffic. In March 2024, it evolved and became part of our core ranking
systems, as our systems use a variety of signals and systems to present helpful
results to users.

### Hummingbird

This was a major improvement to our overall ranking systems made in August 2013.
Our ranking systems have continued to evolve since then, just as they had been
evolving before.

### Panda System

This was a system designed to better ensure high-quality and original content
was appearing in our search results. Announced in 2011 and given the nickname of
the "Panda," it evolved and became part of our core ranking systems in 2015.

### Penguin System

This was a system designed to combat link spam. Announced in 2012 and given the
nickname of the "Penguin Update", it was integrated into our core ranking
systems in 2016.

---

## Google Search's Reviews System and Your Website

The reviews system aims to better reward high quality reviews, which is content
that provides insightful analysis and original research and is written by
experts or enthusiasts who know the topic well. This page explains more about
how the reviews system works, and what you can do to assess and improve your
content.

### How the Reviews System Works

The reviews system works to ensure that people see reviews that share in-depth
research, rather than thin content that simply summarizes a bunch of products,
services or other things. The reviews system is improved at a regular and
ongoing pace.

The reviews system is designed to evaluate articles, blog posts, pages or
similar first-party standalone content written with the purpose of providing a
recommendation, giving an opinion, or providing analysis. It does not evaluate
third-party reviews, such as those posted by users in the reviews section of a
product or services page.

Reviews can be about a single thing, or head-to-head comparisons, or
ranked-lists of recommendations. Reviews can be about any topic. There can be
reviews of products such as laptops or winter jackets, pieces of media such as
movies or video games, or services and businesses such as restaurants or fashion
brands.

The reviews system primarily evaluates review content on a page-level basis.
However, for sites that have a substantial amount of review content, any content
within a site might be evaluated by the system. If you don't have a lot of
reviews, a site-wide evaluation is not likely to happen.

**Currently, this system applies to the following languages globally:** English,
Spanish, German, French, Italian, Vietnamese, Indonesian, Russian, Dutch,
Portuguese, Polish.

In the case of products,
[product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
might help us better identify if something is a product review, but we don't
solely depend on it.

### What Does This System Mean for My Site?

To learn more about how to create content that's successful with the reviews
system, see our help page on
[how to write high quality reviews](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews).

Content impacted by the reviews system may recover over time, if you've made
improvements to your content. However, note that our automated assessment of
review content is only one of many factors used in ranking content, so changes
can happen at any time for various reasons.

---

## Write High Quality Reviews

Publishing high quality reviews can help people learn more about things they are
considering, such as products, services, destinations, games, movies or other
topics. For example, you could write a review as:

- An expert staff member or a merchant who guides people between competing
  products.
- A blogger that provides independent opinions.
- An editorial staff member at a news or other publishing site.

To help people discover your review pages in Google Search and on other Google
surfaces, follow these best practices:

### Best Practices for Review Content

- **Evaluate from a user's perspective.**
- **Demonstrate that you are knowledgeable** about what you are reviewing—show
  you are an expert.
- **Provide evidence** such as visuals, audio, or other links of your own
  experience with what you are reviewing, to support your expertise and
  reinforce the authenticity of your review.
- **Share quantitative measurements** about how something measures up in various
  categories of performance.
- **Explain what sets something apart** from its competitors.
- **Cover comparable things to consider**, or explain which might be best for
  certain uses or circumstances.
- **Discuss the benefits and drawbacks** of something, based on your own
  original research.
- **Describe how a product has evolved** from previous models or releases to
  provide improvements, address issues, or otherwise help users in making a
  purchase decision.
- **Focus on the most important decision-making factors**, based on your
  experience or expertise (for example, a car review might determine that fuel
  economy and safety are key decision-making factors and rate performance in
  those areas).
- **Describe key choices** in how a product has been designed and their effect
  on the users beyond what the manufacturer says.
- **Include links to other useful resources** (your own or from other sites) to
  help a reader make a decision.
- **Consider including links to multiple sellers** to give the reader the option
  to purchase from their merchant of choice.
- **When recommending something as the best overall** or the best for a certain
  purpose, include why you consider it the best, with first-hand supporting
  evidence.
- **Ensure there is enough useful content** in your ranked lists for them to
  stand on their own, even if you choose to write separate in-depth single
  reviews.

### Affiliate Links

Reviews often use affiliate links, so that if someone finds a review useful and
follows the provided link to purchase, the creator of the review is rewarded by
the seller. If you do this, see also
[Google's position on affiliate programs](https://developers.google.com/search/docs/specialty/ecommerce/affiliate-programs).

### Conclusion

Reviews can be a great resource for people when making decisions. When writing
reviews, focus on the quality and originality of your reviews, not the length,
following as many of the above best practices as you are able. This will deliver
the most value to those reading your reviews.

# AI Innovations in Meta's Ad Ranking Driving Advertiser Performance

At Meta, we harness the power of AI to drive better experiences for people, and
better results for your business – not only with our advertising tools, but also
on the behind the scenes in our ads infrastructure and ranking systems to make
your ads more relevant, effective, and personalized. We've adopted innovative
approaches to machine learning modeling in ads, by developing and utilizing
cutting-edge technologies that combine the best of human insight with the speed
and scale of artificial intelligence.

## Overview

Here are four AI innovations in ads ranking that are driving advertiser
performance:

---

## 1. Meta GEM: The Super Brain

### What is Meta GEM?

Generative Ads Recommendation Model, GEM, is a powerful new machine learning
model trained on thousands of GPUs to optimize results for ad products,
delivering an improvement in ad performance. GEM enables the ads system to
rapidly process large amounts of data to deliver highly relevant and
personalized ads, and has enabled a paradigm shift for recommender systems. We
recently rolled out GEM more broadly in our ads system following the success in
improved ad conversion results in Meta Reels earlier this year.

### Simplified Explanation

Imagine having a super brain that can read an entire library of books in
seconds, understand the relationships between all the characters, remember every
single detail, and connect the details into an understanding of the sequence of
events a person goes through across all types of activities. That's what GEM
does for Meta's ad system: catalogs, analyzes, and connects trillions of pieces
of information, making it incredibly intelligent and effective. With GEM, Meta's
recommendation system learns from an enormous amount of data, recognizes subtle
patterns, and provides the most relevant ads to the right person at the right
time with low latency.

### Results

- **Ad conversions increased by up to 5%** during the initial launch on Meta
  Reels this year[^1]

---

## 2. Meta Lattice: The Giant Library

### What is Meta Lattice?

Meta Lattice is our ad ranking architecture that allows us to generalize
learnings across campaign objectives and surfaces in place of numerous, smaller
ads models that have historically been optimized for individual objectives and
surfaces. This is not only leading to increased efficiency as we operate fewer
models, but also improving ad performance. These significantly larger models are
able to learn more because they can represent steps that people take in their
purchase journey across surfaces and campaigns. For a deeper understanding,
[read more here](https://engineering.fb.com/2024/12/02/ml-applications/meta-lattice-ads-ranking-architecture/).

### Simplified Explanation

Think of Meta Lattice as one giant library. In the past, we had many small
libraries, each dedicated to a specific subject like history or art. Each
library had its own set of books and librarians who were experts in that one
subject. Now, with Meta Lattice, it's like we've combined all those small
libraries into one library, connecting information from all subjects. It doesn't
just have more books; the expert librarians can also learn from all the books it
has and apply that knowledge to different subjects. This is much more efficient
because we only maintain one library, and it can help people find better
information faster, no matter what they're looking for.

In the world of ads, this means we can use one powerful system to improve how
ads are shown to people, making them more relevant and effective, rather than
relying on many smaller systems that each focus on just one type of ad product
or placement destination.

### Results

- **Ad quality increased by almost 12%**
- **Ad conversions increased by up to 6%**

---

## 3. Meta Andromeda: The Personal Concierge

### What is Meta Andromeda?

Meta Andromeda is an innovative end-to-end hardware, software, machine learning
co-designed system introduced in 2024, with Meta Training and Inference
Accelerator (MTIA) and NVIDIA Grace Hopper Superchip. This more efficient system
enabled a 10,000x increase in the complexity of models used for ads retrieval,
the first step in the ranking process where we narrow down a pool of tens of
millions of ads to the few thousand we consider showing someone. The increase in
model complexity enables running far more sophisticated prediction models to
better personalize ads. And, as businesses upload more and more creatives to
support a diversification strategy, Meta Andromeda works behind the scenes to
power more complex models that allows Meta to pick the right creative to deliver
more personalized ads that are relevant and interesting. For a deeper
understanding,
[read more here](https://engineering.fb.com/2024/12/02/data-infrastructure/meta-andromeda-ads-ranking-system/).

### Simplified Explanation

Imagine having a personal concierge who knows your tastes so well that they
don't just understand that you covet shoes, but that you like to wear red flip
flops at the beach. Meta Andromeda learns your preferences, so Meta can show you
ads that are more relevant and interesting.

### Results

- **Ad quality increased by 8%**
- Increased the impact of Advantage+ automation and creative GenAI tools for
  advertisers

---

## 4. Sequence Learning: The Memory Game

### What is Sequence Learning?

Sequence Learning is an AI modeling technique that enables our ads systems to
consider the sequence of actions a person takes before and after seeing an ad.
This allows a deeper understanding of the purchase journeys people take,
allowing us to deliver more personalized and relevant ads, at the right time.
Sequence model learning techniques do this by more deeply understanding patterns
around a conversion to better infer sequence of ads for optimizing future
conversions for purchase. For a deeper understanding,
[read more here](https://engineering.fb.com/2024/12/02/ml-applications/sequence-learning-meta-ads/).

### Simplified Explanation

For example, previously with traditional aggregated data models, if a user
converted on one ski resort ad, they may continue to see other ski resort ads.
With recent changes in our ads learning model, after purchasing a ski resort
room a person would now see ads for ski equipment, lift tickets or ski luggage,
providing more relevant ads personalized to the purchase journey.

### Results

- **Conversions increased by 3%** since adopting Sequence Model Learning last
  year, based on testing within selected segments

---

## Summary Table

| Innovation            | Description                                                          | Key Results                                                  |
| --------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------ |
| **Meta GEM**          | Super brain processing trillions of data points for personalized ads | Up to 5% increase in ad conversions                          |
| **Meta Lattice**      | Unified library architecture generalizing learnings across campaigns | 12% increase in ad quality, up to 6% increase in conversions |
| **Meta Andromeda**    | Personal concierge system with 10,000x model complexity increase     | 8% increase in ad quality                                    |
| **Sequence Learning** | Memory game understanding purchase journey sequences                 | 3% increase in conversions                                   |

---

[^1]: Results based on initial testing and deployment metrics

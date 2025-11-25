Meta Andromeda: Supercharging Advantage+ automation with the next-gen personalized ads retrieval engine

Andromeda is Meta’s proprietary machine learning (ML) system design for retrieval in ad recommendation focused on delivering a step-function improvement in value to our advertisers and people. 
This system pushes the boundary of cutting edge AI for retrieval with NVIDIA Grace Hopper Superchip and Meta Training and Inference Accelerator (MTIA) hardware through innovations in ML model architecture, feature representation, learning algorithm, indexing, and inference paradigm.
We’re sharing how Andromeda establishes an efficient scaling law for retrieval by harnessing the power of state-of-the-art deep neural networks, benefitting from the co-design of ML, system, and hardware (NVIDIA and MTIA chips) that improves performance and return on investment.
AI plays an important role in Meta’s advertising system by leveraging the power of machine learning (ML) to predict which ads a person will find most interesting. This helps people learn about a business or product they are interested in while helping an advertiser meet their objectives such as increasing brand awareness, acquiring new customers, and driving sales./Users/Hjelmeland/my-app/z-meta-ads/meta-andromeda.md

Retrieval is the first step in our multi-stage ads recommendation system. This stage is tasked with selecting ads from tens of millions of ad candidates into a few thousand relevant ad candidates. In the following stage, larger and more sophisticated ranking models predict people and advertiser value to determine the final set of ads to be shown to the person. 

Challenges and opportunities in this new era of advertiser automation with generative AI
The retrieval stage is challenging primarily because of scalability constraints in two axes: volume of ad candidates and tight latency constraints.

Volume of ad candidates: Retrieval processes three orders of magnitude more ads than subsequent stages. Features like predictive targeting, which dramatically improve advertiser outcomes, are computationally expensive. The continued positive momentum of Meta’s Advantage+ suite further increases the number of eligible ads through automation of audience creation, optimal budget allocation, dynamic placement across Meta surfaces, and creative generation. Finally, with the adoption of powerful new tools based on generative AI for creating and optimizing ad creative content, the number of ads creatives in Meta’s recommendation systems is expected to grow significantly.

Tight latency constraints: Selecting ads rapidly is essential for delivering timely and relevant ads, as any delay can disrupt the viewers experience by not providing the most current content. As advertising becomes increasingly dynamic, frequent updates to both delivery and each person’s interests demand increased model complexity in near real-time.

Processing such a vast number of ads in so little time is capacity intensive, which requires substantial optimization and innovation to scale up model complexity for better personalization while maintaining a high return on investment (ROI) on the required infrastructure investments. 

Unlocking advertiser value through industry-leading ML innovation
Meta Andromeda is a personalized ads retrieval engine that leverages the NVIDIA Grace Hopper Superchip, to enable cutting edge ML innovation in the Ads retrieval stage to drive efficiency and advertiser performance. Key AI advancements include: 

Deep neural networks custom-designed for the NVIDIA Grace Hopper Superchip to deliver superior performance
Andromeda improves performance of Meta ads system by delivering more personalized ads to viewers and maximizing return on ad spend for advertisers. Meta’s Ads team has created a deep neural network with increased compute complexity and massive parallelism on the NVIDIA Grace Hopper Superchip to better learn higher-order interactions from people and ads data. Its deployment across Instagram and Facebook applications has achieved +6% recall improvement to the retrieval system, delivering +8% ads quality improvement on selected segments.

Hierarchical indexing to support exponential ad creatives growth from Advantage+ creative 
Advantage+ automates budget allocation, audience targeting, and bid adjustments – streamlining campaign management and boosting performance through more ads in the system for different audiences. 

For example, when advertisers who did not previously use Advantage+ creative turned on its AI-driven targeting features, they experienced a 22% increase in ROAS from our ads. We estimate that businesses using image generation are seeing a +7% increase in conversions. Even at this early stage, more than a million advertisers used our generative AI (GenAI) tools to create more than 15 million ads in a month. Andromeda is designed to maximize ads performance by utilizing the exponential growth in volume of eligible ads available to the retrieval stage. It introduces an efficient hierarchical index to scale up to a large volume of ads creatives, empowering the adoption of GenAI technologies by advertisers.

AI development efficiency
Andromeda reduces system complexity by minimizing components and rule-based logic, allowing for end-to-end performance optimization. This streamlined system enhances pace of adoption for future AI innovation in the retrieval space.

Meta’s new personalized ads retrieval paradigm
Before Andromeda, Meta’s retrieval systems were only able to apply limited personalization, relying on a process with isolated model stages and numerous rule-based heuristics to manage the vast number of ads. This approach hindered end-to-end optimization and efficient global resource allocation to maximize performance. Handling such a massive volume of ads per request was complex, memory bandwidth-intensive, and difficult to scale, resulting in low hardware-level parallelism in conventional retrieval models. This often led to suboptimal performance and slower adoption of AI innovations.



Andromeda represents a significant technological leap in retrieval – addressing the above challenges with key ML and system innovations.

A state-of-the-art deep neural network for retrieval
Andromeda is able to efficiently scale retrieval models by designing a highly customized deep neural network with sublinear inference cost, enabling a meaningful increase of model capacity (10,000x) for enhanced personalization. Complex latent relationships between people’s interests, products, and services offered through ads are captured through advanced interaction features and new algorithms, further enhancing recommendation relevance and accuracy.

The design is optimized for AI hardware, minimizing memory bandwidth bottlenecks and enabling highly parallel, computation-intensive retrieval models with high performance. GPU preprocessing is used for feature extraction, and all precomputed ad embeddings and features are stored in the local memory of the Grace Hopper Superchip. This approach addresses the traditional scaling constraints of limited CPU-to-GPU interconnect bandwidth, heavy memory IO overhead, and low GPU utilization and enables efficient handling of a larger set of diverse feature inputs.

Hierarchical indexing for efficiency and scalable retrieval
Andromeda organizes ads into a hierarchical index with multiple layers, reducing the number of inference steps by focusing only on most relevant nodes. The hierarchical index and retrieval models are jointly trained, which aligns the index representations with neural networks; this improves both precision and recall compared to commonly used two-tower neural networks or approximate nearest neighbor search. 

The hierarchical structured neural network provides sub-linear inference costs, enabling retrieval models to scale up to much higher capacity, allowing efficient handling of a larger volume of ads with high retrieval accuracy while achieving higher performance.

Model elasticity
Andromeda enhances overall system ROI by enabling agile and efficient resource allocation. A segment-aware design leverages higher complexity models to serve high value ads segments to maximize ROI. It automatically adjusts model complexity and inference steps in real-time based on available resources, thereby allowing a more scalable retrieval system. Together with a hierarchical structured neural network, model elasticity further boosts model inference efficiency by 10x.

An optimized retrieval model
Andromeda significantly enhances the retrieval model’s instruction and thread-level parallelism through innovations in model architecture, features, learning algorithms, and the inference paradigm. This model is built with low-latency, high-throughput, and memory-IO aware GPU operators, utilizing deep kernel fusion and advanced software pipelining techniques. This minimizes kernel dispatching overhead, avoids bottlenecks on repeated HBM-SRAM memory IO, and reduces dependency on low arithmetic intensity modules. 

Unlike conventional retrieval models that rely on expert-engineered features, Andromeda leverages the NVIDIA Hopper GPU’s massive parallel computing capabilities to dynamically reconstruct latent user-ad interaction signals on-the-fly, achieving over 100x improvement in both feature extraction latency and throughput of previous CPU based components. In addition, the chip’s high-bandwidth CPU-GPU interconnection supercharges ads retrieval inference to process an enormous number of ads per request, enabling a faster and more efficient delivery of relevant and personalized Ads. The effort has enhanced end-to-end model inference queries per second (QPS) by over 3x.

Advancing the state of art in ads retrieval
Andromeda significantly enhances Meta’s ads system by enabling the integration of AI that optimizes and improves personalization capabilities at the retrieval stage and improves return on ad spend. A hierarchical indexing solution leveraging deep neural networks co-designed with the NVIDIA Grace Hopper Superchip helps address the scalability challenges presented by the exponential growth of creatives while delivering the best experience given the strict latency and capacity ROI budgets. Andromeda capitalizes the fast industry adoption of Advantage+ automation and GenAI to deliver value for our advertisers, people who use our suite of products, and Meta.

Looking forward, the Andromeda model architecture is expected to transition to support an autoregressive loss function, leading to a more efficient and faster inferencing solution that delivers a more diverse set of ad candidates. Increased ad diversity can improve people’s experience with ads and drive better advertiser outcomes. 

Integrating Andromeda with MTIA and future generations of commercially-available GPUs will continue to push the boundaries of scaling retrieval – further improving advertiser performance and achieving what we estimate will be another 1,000x increase in model complexity. 

Acknowledgements
We would like to thank Habiya Beg, Zain Brohi, Wenlin Chen, Yan Dong, Chunli Fu, Uday Garikipati, Golnaz Ghasemiesfeh, Xingfeng He, Akshay Hegde, Liquan Huang, Liuhan Huang, Kamran Izadi, Santosh Janardhan, Karthik Jayaraman, Changkyu Kim, Santanu Kolay, Ilia Lewis, Wenqian Li, Xiaotian Li, Rocky Liu, Paolo Massimi, Kexin Nie, Sandeep Pandey, Uladzimir Pashkevich, Alexander Petrov, Varna Puvvada, Hang Qu, Melanie Roe, Vibha Sinha, Yan Shi, Matt Steiner, Alisha Swinteck, Bangsheng Tang, Jim Tao, Sunay Vaishnav, Arunprasad Venkatraman, Vidhoon Viswanathan, Sasha Vorontsov, Minghui Wanghan, Fangzhou Xu, Nathan Yan, Tak Yan, Yang Yang, Qing Zhang, Fangyu Zou, and everyone who contributed to the success of Meta Andromeda.


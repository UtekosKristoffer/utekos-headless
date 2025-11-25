Understand Advantage+ campaign budget results

We are gradually introducing greater daily budget flexibility to some Meta Ads Manager accounts. This means on days when better opportunities are available for you, we may spend up to 75% over your daily budget on some days and less on others. On a weekly basis, we won’t spend more than 7 times your daily budget. If your campaign is less than 7 days, the total spend will not exceed your daily budget, multiplied by the campaign duration.
Advantage+ campaign budget (also known as Campaign budget, or Budget with Advantage+ on) automatically manages your campaign budget across ad sets to get you the overall best results. It can be difficult to understand your spend as it can fluctuate. Use the following best practices when analyzing results for Advantage+ campaign budget.

Look at results for your campaign as a whole, not for individual ad sets. To analyze Advantage+ campaign budget performance, look at the total number of results for your campaign and the average cost per optimization event at the campaign level.
Advantage+ campaign budget aims to get you the best results overall, and may not spend your budget equally for each ad set. For example, if you have 2 active ad sets in your campaign, we might spend most of your budget on one ad set if that’s how we can get the overall best results.
If you only look at results for individual ad sets, it may seem like Advantage+ campaign budget is spending more budget on ad sets with a higher cost per optimization event. However, this doesn’t take into account the cost of optimization events across all of your ad sets, and how costs changed over time. Learn more about how Advantage+ campaign budget distributes budget with the highest volume bid strategy, and why it can be misleading to only consider spend for individual ad sets.
Remember that it’s normal to see some fluctuation in spend. For example, daily budgets are an average, and may fluctuate up to 75% above or below your budget on a given day. If you use a lifetime budget, we may spend more on days when better opportunities are available, less on days with fewer opportunities. The delivery system also predicts the best times throughout the day to deliver ads according to your optimization objectives. That means it’s usually normal for delivery to be focused within a certain period of the day. If you think you’re seeing more than this normal fluctuation, check if:
Your ad sets are in the learning phase. Ad performance is typically less stable during the learning phase. In Meta Ads Manager, the Delivery column reads "Learning" when an ad set is in the learning phase.
Settings within your campaign, ad set or ad are constraining delivery. Constrained delivery can cause results to slow down or even stop entirely. Learn more about how to identify and troubleshoot delivery issues with Advantage+ campaign budget.
Your budget or schedule was changed near the end of the day. If you change your budget or schedule near the end of the day, the system may not have enough time to apply new settings. For example, if you decrease your daily budget from $200 to $100 at 5pm, the system may have spent over your new daily budget of $100 already.
Remember that it’s normal for a campaign’s average cost per optimization event to increase over time. The delivery system seeks the highest volume opportunities first. When those lower cost opportunities run out, the system may move on to more expensive options, depending on your bid strategy. This means you may see costs increase over the schedule of your campaign.
Be careful when using specific result breakdowns. For example, if you break down the results of your campaign by hour, you may see performance oscillations that average out over time. Try using result breakdowns at the campaign level over the course of a full week. You can also try viewing results with no breakdowns at all to understand the overall performance of your campaign.
Remember that your audience size and optimization choice can affect budget distribution.
If your audiences are significantly different in size, ad sets with the largest audiences will likely receive the most budget with Advantage+ campaign budget.


Understand Advantage+ campaign budget reporting when using the highest volume bid strategy
Summary
You shouldn't judge how Meta Advantage+ campaign budget (previously known as campaign budget optimization) distributes your budget based on the average cost per optimization event for each ad set and how much we spent on it. You should judge it based on the total number of results for your campaign and the average cost per optimization event at the campaign level.

Context
When viewing the results of a campaign that used Advantage+ campaign budget and the highest volume bid strategy, you may see some numbers that are different from what you expected. This article explains what these results actually indicate, and why you shouldn't worry that Advantage+ campaign budget isn't working properly.

Advantage+ campaign budget and the highest volume bid strategy help you get the highest volume per optimization event for your campaign overall, not for any given ad set.
The highest volume bid strategy goes after the lowest-cost optimization events available. However, over time, as the inexpensive ones are exhausted, we have to start spending on more expensive optimization events to continue spending your budget. (These "more expensive optimization events" are still the lowest-cost optimization events available at that time.)
The amount of optimization events and ratio of "inexpensive" to "expensive" (these descriptions are relative to the type of campaign you're running) optimization events varies from ad set to ad set. Some may have a few very inexpensive optimization events and many very expensive optimization events. Others may have a lot of moderately expensive optimization events.
Example
Here's a simplified example that shows how Advantage+ campaign budget spends your budget and why the reporting on the amount spent on each ad set might be confusing at first.

Note: Remember that you won't have information on things like the total number of opportunities for each ad set or how much each result costs when actually running and analyzing reports on your campaigns.

Say there are 15 opportunities to show your ad:

4 for ad set A
6 for ad set B
5 for ad set C
The opportunities for A cost $5 each. The opportunities for B cost $2 each. 3 opportunities for C cost $1, 1 costs $7 and 1 costs $8. You have a campaign budget of $30.
Advantage+ campaign budget would get you:

12 optimization events for $30
An average cost per optimization of $2.50 for your campaign
Here's how those results would break down at the ad set level:

A: 3 optimization events for $5 each ($15 of total spend)
B: 6 optimization events for $2 each ($12 of total spend)
C: 3 optimization events for $1 each ($3 of total spend)

At this point, since you wouldn't know about the other, more expensive opportunities our system avoided, you might wonder: Why did you spend so much on the ad set with the highest average cost per optimization event and so little on the ad set with the lowest? You might even be tempted to turn off ad set A or Advantage+ campaign budget itself.

Here's why turning off ad set A isn't a good idea. Given the same set of opportunities but with ad set A turned off, you'd get:

11 optimization events for $30
An average cost per optimization event of $2.73 for your campaign
Here's how those results would break down at the ad set level:

A: No results
B: 6 optimization events for $2 each ($12 of total spend)
C: 5 optimization events for an average of $3.60 each ($18 of total spend)

This shows how, by taking the optimization events available to A, we avoided having to take the even more expensive optimization events available to C. C has inexpensive initial optimization events available, but it quickly gets much more expensive to spend money on it. A has more expensive initial optimization events, but its cost per optimization event is more stable. This makes A a better choice for budget distribution over time, which means we'll spend more money on it overall.

Here's why turning off Advantage+ campaign budget altogether isn't a good idea either. For the sake of simplicity, let's assume you divided your $30 campaign budget evenly between your 3 ad sets, giving each one a $10 budget. Here are the results that would produce for the same set of opportunities:

11 optimization events for $30
An average cost per optimization event $2.73 for your campaign
Here's how those results would break down at the ad set level:

A: 2 optimization events for $5 each ($10 of total spend)
B: 5 optimization events for $2 each ($10 of total spend)
C: 4 optimization events for an average cost of $2.50 each ($10 of total spend)


About creative fatigue recommendations in Meta Ads Manager

This feature is only available for ad sets with one creative except those with Advantage+ catalog ads (previously dynamic ads), dynamic creative, or Meta Advantage+ app campaigns. It is not available with the sales objective before an ad set is active.
Creative fatigue occurs when an audience has seen the same creative too many times. People may be less likely to engage with your ad which can lead to a higher cost per result. When eligible, you can get experimentally proven creative fatigue recommendations in opportunity score. Opportunity score is a tool from Meta that helps you identify and prioritize effective campaign recommendations in near real time. Learn about opportunity score.

Note: Opportunity score is not yet available to all ad accounts. The score (including a high score) itself does not reflect your actual or future performance. Actual performance depends on many factors and your opportunity score does not guarantee performance.

How we identify creative fatigue
Before a campaign is active: If we predict creative fatigue may occur in the first 7 days of your campaign, we will warn you before you publish your ad.
After a campaign is active: When we believe that your audience has seen the same ad too many times, you will see Creative limited or Creative fatigue in the Delivery column status for your ad set or ad. We consider all recent exposures of the ad's image or video, including those from other campaigns from your Page. We also consider your ad’s cost per result. When cost per result is more than ads you ran in the past but less than twice as much, you will see a Creative limited status. When cost per result is more than or equal to twice as much as ads you ran in the past, you will see a Creative fatigue status.
Potential recommendations for creative fatigue
Depending on your ad setup, we may provide the following recommendations before or after your campaign is active:

Create another ad: Create a new ad with a new image or video that is materially different from the original creative. Note: Keeping your original ad active instead of pausing or turning it off may maximize results.
Expand your audience: Increase your audience size and reach new people who have not seen your ad too much yet.
Try Meta Advantage+ creative: Advantage+ creative automatically creates variations of your ad using a single image or video and shows a personalized ad to each person based on what it appears they are most likely to respond to. Note: Advantage+ creative is only available for campaigns using the traffic or sales objectives with website destination.


About the learning phase
Each time an ad is shown, our ads delivery system learns more about the best people and places to show the ad. The more an ad is shown, the better the delivery system becomes at optimizing the ad’s performance.

The learning phase is the period when the delivery system still needs to learn about how an ad set may deliver and perform. During the learning phase, the delivery system is exploring the best way to deliver your ad set when you either create a new ad or ad set or make a significant edit to an existing one. The Delivery column reads "Learning" when an ad set is currently in the learning phase.

While the delivery system never stops learning about the best way to deliver an ad set, ad sets exit the learning phase as soon as they can deliver stably. This usually occurs after about 50 results in the week after the ad set’s last significant edit. To better understand if you’re getting enough results after making a significant edit, you can view the number of results you've received and your last significant edit as reporting columns in Ads Manager. To see your results after a significant edit:

Go to Ads Manager and select the ad set you want to review.
Review the date of your last significant edit in the Last significant edit column.
Review the number of results in the Results column. Note: If you have customized columns, you may need to add these as columns.
Note: For Shops ads, you need a minimum of 17 purchases through your website and 5 through Meta for the learning phase to complete.

Best practices
During the learning phase, ad sets are less stable and usually have a higher CPA. To avoid behaviors that prevent ad sets from exiting the learning phase, we recommend you:

Wait to edit your ad set until its out of the learning phase. During the learning phase, performance is less stable, so your results aren't necessarily indicative of future performance. By editing an ad, ad set or campaign during the learning phase, you reset learning and delay our delivery system’s ability to optimize.
Avoid unnecessary edits that cause ad sets to re-enter the learning phase. Edits that meaningfully change how your ad set might perform in the future can cause an ad set to re-enter the learning phase. Only edit your ads or ad set when you have reason to believe that doing so should improve performance.
Avoid high ad volumes. When you create many ads and ad sets, the delivery system learns less about each ad and ad set than when you create fewer ads and ad sets. By combining similar ad sets, you also combine learnings.
Use realistic budgets. If you set a very small or inflated budget, the delivery system has an inaccurate indicator of the people for whom the delivery system should optimize. Set a budget large enough to get enough total results and avoid frequent budget changes (which can cause an ad set to re-enter the learning phase).
The learning phase is necessary to help the delivery system best optimize ads, so you shouldn't try to avoid the learning phase completely. Testing new creative and marketing strategies is essential for improving your performance over time.

Learning limited
If your ad set isn’t getting enough results to exit the learning phase, the Delivery column status reads "Learning limited." Learn more about ways to fix learning limited ad sets to improve your performance.


About ad quality
How ad quality works
Our ad system is designed to maximize value for people and businesses. Higher quality ads perform better in the auction because we’ve designed the auction to help create higher quality experiences for people. Ad quality is determined by the analysis of many sources including feedback from people viewing or hiding the ad and assessments of low-quality attributes and practices.

Why ad quality matters
Your ad will perform better in the auction if it’s higher quality. Ads with a lower quality ranking tend to cost more, which may reduce distribution of the ads and lead to fewer results.
In certain instances, if you repeatedly post policy-violating or lower quality ads, our systems may start considering all ads from your Page, domain, ad account or other associated entities as lower quality.

You can improve your ad performance by recognizing instances of low-quality attributes and removing them from your ads or by ensuring your Page, domain, ad account or other associated entities comply with Meta Advertising Standards. Over time, your ad performance should improve.

How to check the quality of your ad
You can check the quality of existing ads in Meta Business Support Home. This is a centralized place where you can monitor and resolve account issues, review the status of your business portfolios, ad accounts, Commerce accounts, catalogs, and Pages.

In Business Support Home, you can also:

Address issues that may need attention due to not complying with our Advertising Standards, Commerce Policies or other policies and terms.
Learn what actions you can take if your account or Page has been disabled or restricted.
Request a review of ads or assets that you believe may have been incorrectly rejected.
How to determine ad quality
You can measure the quality of your ad relative to other ads competing for the same audience by using quality ranking in ad relevance diagnostics.

In certain instances, we’ll send you a notification so you know when low-quality attributes are severely affecting the performance of your ads.

Tips for improving the quality of ads
Do make sure your ads and landing pages are relevant and useful to the audience you want to reach. You can find additional resources on advertising best practices in the Meta Business Help Center, such as Tips to make your ads resonate, Best practices for cost-effective creative and Best practices to make your ad more engaging.
Do not use low-quality attributes in your ads and post-click experiences, including landing pages.
How violations of Meta Advertising Standards affect your ad delivery
If we detect that an ad violates our Advertising Standards, we reject it.

About creative fatigue recommendations in Meta Ads Manager

This feature is only available for ad sets with one creative except those with Advantage+ catalog ads (previously dynamic ads), dynamic creative, or Meta Advantage+ app campaigns. It is not available with the sales objective before an ad set is active.
Creative fatigue occurs when an audience has seen the same creative too many times. People may be less likely to engage with your ad which can lead to a higher cost per result. When eligible, you can get experimentally proven creative fatigue recommendations in opportunity score. Opportunity score is a tool from Meta that helps you identify and prioritize effective campaign recommendations in near real time. Learn about opportunity score.

Note: Opportunity score is not yet available to all ad accounts. The score (including a high score) itself does not reflect your actual or future performance. Actual performance depends on many factors and your opportunity score does not guarantee performance.

How we identify creative fatigue
Before a campaign is active: If we predict creative fatigue may occur in the first 7 days of your campaign, we will warn you before you publish your ad.
After a campaign is active: When we believe that your audience has seen the same ad too many times, you will see Creative limited or Creative fatigue in the Delivery column status for your ad set or ad. We consider all recent exposures of the ad's image or video, including those from other campaigns from your Page. We also consider your ad’s cost per result. When cost per result is more than ads you ran in the past but less than twice as much, you will see a Creative limited status. When cost per result is more than or equal to twice as much as ads you ran in the past, you will see a Creative fatigue status.
Potential recommendations for creative fatigue
Depending on your ad setup, we may provide the following recommendations before or after your campaign is active:

Create another ad: Create a new ad with a new image or video that is materially different from the original creative. Note: Keeping your original ad active instead of pausing or turning it off may maximize results.
Expand your audience: Increase your audience size and reach new people who have not seen your ad too much yet.
Try Meta Advantage+ creative: Advantage+ creative automatically creates variations of your ad using a single image or video and shows a personalized ad to each person based on what it appears they are most likely to respond to. Note: Advantage+ creative is only available for campaigns using the traffic or sales objectives with website destination.


About performance goals
When you choose a performance goal for an ad set, you're telling the ad delivery system to get you that result as efficiently as possible. In other words, your performance goal is the desired outcome that our system bids on in the ad auction. For example, if you choose Maximize number of link clicks, your ads will be targeted to people in your audience who are most likely to click the links on your ads.

Based on the performance goal you choose, the ad delivery system uses machine learning to improve your ad performance. The performance goal of your ad set can be different from your ad objective. For example, you can select Sales as your ad objective, but optimize for link clicks within an ad set.

Note: You may need to set up a Meta Pixel or SDK to use some performance goals, such as value. These tools allow you to pass back web or app event data to Meta technologies.

Types of performance goals
Some performance goals are only available when you select a specific ad objective and conversion location, while other performance goals are available to more than one ad objective. Learn more about what performance goals are available by ad objective and conversion location in Meta Ads Manager. Below is a list of performance goals available within each objective and what actions they each optimize for:


Goals available when you select Sales as an ad objective
Maximize number of conversions: Show your ads to people most likely to take a specific action on your website.
Maximize value of conversions: Show your ads to people most likely to make higher value purchases.
Maximize number of landing page views: Show your ads to people most likely to view the website linked in your ad.
Maximize number of link clicks: Show your ads to people most likely to click on them.
Maximize daily unique reach: Show your ads to people up to once per day.
Maximize number of impressions: Show your ads to people as many times as possible.
Maximize number of conversations: Show your ads to people most likely to have a conversation with you through messaging.
Maximize number of calls: Show your ads to people most likely to call you.
Maximize number of app events: Show your ads to people most likely to take a specific action in your app at least once.
How performance goals can affect your budget and bid strategy
Remember that some performance goals may require more budget than others. For example, a conversion may cost more than a landing page view. So, it’s important to ensure the following when selecting your budget and bid strategy:

Your budget is large enough to accommodate the cost of your chosen performance goal: In general, your daily budget should be at least 10 times the average cost of your performance goal. For example, if you want to optimize for link clicks and your average cost per link click is $5, your daily budget should be at least $50.
You’ve set your bid cap or cost per result goal high enough to achieve your chosen performance goal: Your bid cap is the maximum amount you’re willing to bid to win in auctions and get the result you’re optimizing for. Your cost per result goal is the average amount you want to pay for your optimization event. Learn more about bid strategies.

Optimization events
The number of times your ads achieved the outcome your ad set is currently optimized for, based on your chosen attribution setting.
How It's Used
This metric shows how well your bid strategy is meeting your goals, based on your current optimization criteria.

The optimization event is chosen within your ad sets. It's the outcome that our system bids on in the ad auction and can be different from your campaign objective. For example, you can choose sales as your campaign objective, but choose to optimize for link clicks within an ad set. It's important that you choose your bid strategy with the optimization event in mind. This helps our system learn how to show ads to the people most likely to get you the outcome you're optimizing for within the selected conversion window.

It can be useful to evaluate the number of optimization events you've received since your last significant edit. For example, if you're using cost per optimization event to determine your target cost bid strategy, you should make sure you have enough optimization events since your last significant edit to indicate stable delivery. We recommend around 50 optimization events, but some ad sets stabilize earlier.

How It's Calculated
This metric is calculated as the number of optimized events that occurred during your chosen conversion window.

For outcomes where time may pass between when someone sees your ad and when the event occurs,Metauses an attribution window that corresponds to the conversion window chosen during ad set creation. For example, if you chose a conversion window of 1-day click and 7-day view when creating your ad set, this metric will use an attribution window of 1-day click and 7-day view to count the outcomes.
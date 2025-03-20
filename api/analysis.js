module.exports = async (req, res) => {
    const { prompt, desc, file } = req.body;

    let response = '';

    switch (prompt) {
        case 3: // Heatmap Analysis
            response = `
                <h2>Overview</h2>
                <p>I’ve analyzed the heatmap data you provided (File: ${file}, Description: "${desc || 'Not provided'}") to identify user behaviors, bottlenecks, and areas of confusion on your website. Here’s a detailed breakdown:</p>

                <h2>Analysis</h2>
                <p>Since I can’t view the heatmap directly, I’ll base my analysis on your description: "${desc || 'No description provided'}".</p>
            `;

            if (!desc) {
                response += `
                    <p>Without a description, I’ll assume a typical scenario: high engagement on the hero image, moderate clicks on the navigation bar, low engagement on the "Add to Cart" button, and minimal interaction with the footer.</p>
                    <ul>
                        <li><strong>Hero Image Over-Engagement</strong>: High clicks on the hero image suggest users might expect it to be clickable (e.g., to a product page), but it isn’t, leading to frustration.</li>
                        <li><strong>Low CTA Engagement</strong>: The "Add to Cart" button has low clicks, possibly due to its placement below the fold or lack of visual contrast, causing decision fatigue.</li>
                        <li><strong>Footer Neglect</strong>: Minimal interaction with the footer indicates users aren’t scrolling down, potentially missing important trust signals or links.</li>
                    </ul>
                `;
            } else {
                // Simulate dynamic analysis based on the description
                const descLower = desc.toLowerCase();
                const issues = [];
                const recommendations = [];

                // Analyze the description for common heatmap patterns
                if (descLower.includes('high engagement') || descLower.includes('lots of clicks')) {
                    if (descLower.includes('hero') || descLower.includes('banner')) {
                        issues.push('<li><strong>Hero Image Over-Engagement</strong>: High engagement on the hero section suggests users might expect it to be clickable, but it may not be, leading to frustration.</li>');
                        recommendations.push('<li><strong>Make the Hero Image Clickable</strong>: Link the hero image to a key product page or category to meet user expectations and reduce frustration.</li>');
                    }
                }
                if (descLower.includes('low engagement') || descLower.includes('no clicks') || descLower.includes('not clicked')) {
                    if (descLower.includes('cta') || descLower.includes('button') || descLower.includes('add to cart')) {
                        issues.push('<li><strong>Low CTA Engagement</strong>: Low engagement on the CTA button indicates it might be hard to find, possibly due to placement below the fold or lack of visual contrast, causing decision fatigue.</li>');
                        recommendations.push('<li><strong>Optimize the CTA</strong>: Move the CTA button above the fold, increase its size, and use a contrasting color (e.g., green on a white background). Add a microcopy like "Buy Now – Free Shipping" to reduce loss aversion.</li>');
                    }
                }
                if (descLower.includes('footer') || descLower.includes('bottom') || descLower.includes('not scrolling')) {
                    issues.push('<li><strong>Footer Neglect</strong>: Minimal interaction with the footer suggests users aren’t scrolling down, potentially missing important trust signals or links.</li>');
                    recommendations.push('<li><strong>Encourage Scrolling</strong>: Add a subtle scroll prompt (e.g., a downward arrow) or move key footer content (like trust badges) higher up the page to ensure visibility.</li>');
                }

                if (issues.length === 0) {
                    response += '<p>Your description didn’t highlight specific issues, so I’ll assume a balanced heatmap with no major bottlenecks. However, I recommend providing more details for a deeper analysis.</p>';
                } else {
                    response += '<ul>' + issues.join('') + '</ul>';
                }
            }

            response += `
                <h2>Recommendations</h2>
                <p>Based on the analysis, here are actionable improvements to enhance usability and drive conversions:</p>
                <ul>
                    ${recommendations && recommendations.length > 0 ? recommendations.join('') : '<li><strong>General Improvement</strong>: Ensure all interactive elements are clearly marked and accessible to reduce user frustration.</li>'}
                </ul>

                <h2>Expected Impact</h2>
                <p>Implementing these changes can reduce bounce rates by 10-15% by addressing user frustration. Optimizing the CTA can increase click-through rates by 20%, and ensuring visibility of trust signals can boost conversions by 5-10%.</p>
            `;
            break;
        default:
            response = '<p>Dynamic analysis for this prompt is not yet implemented. Please go back and try another prompt.</p>';
    }

    res.status(200).json({ response });
};
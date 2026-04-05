<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LaunchMap - Verify Your Business Idea</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background: white;
  color: #0a0a0a;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

/* Announcement bar */
.announcement {
  background: #1a1a1a;
  padding: 12px 20px;
  text-align: center;
}

.announcement a {
  color: #ff6b35;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
}

.announcement a:hover {
  text-decoration: underline;
}

/* Navigation */
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 60px;
  background: white;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.nav-links {
  display: flex;
  gap: 40px;
  align-items: center;
}

.nav-link {
  font-size: 15px;
  color: #0a0a0a;
  text-decoration: none;
  font-weight: 500;
}

.book-demo {
  background: #0a0a0a;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
}

/* Hero */
.hero {
  max-width: 1400px;
  margin: 0 auto;
  padding: 140px 60px 100px;
}

.hero h1 {
  font-size: clamp(48px, 6vw, 80px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -2.5px;
  margin-bottom: 60px;
  max-width: 900px;
}

.accent {
  color: #ff6b35;
  display: block;
}

.hero-form {
  display: flex;
  gap: 16px;
  max-width: 500px;
  margin-bottom: 24px;
}

.hero-input {
  flex: 1;
  padding: 16px 20px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  background: #fafafa;
}

.hero-input::placeholder {
  color: #999;
}

.hero-input:focus {
  outline: none;
  border-color: #0a0a0a;
  background: white;
}

.hero-button {
  background: #0a0a0a;
  color: white;
  padding: 16px 32px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  white-space: nowrap;
}

.hero-button:hover {
  background: #2a2a2a;
}

.hero-note {
  font-size: 15px;
  color: #666;
  max-width: 800px;
  line-height: 1.7;
  margin-bottom: 120px;
}

/* Trust section */
.trust-section {
  max-width: 1400px;
  margin: 0 auto 140px;
  padding: 0 60px;
}

.trust-label {
  font-size: 13px;
  color: #999;
  margin-bottom: 48px;
  text-align: center;
  letter-spacing: 0.5px;
}

.logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;
  flex-wrap: wrap;
}

.logo-item {
  font-size: 20px;
  font-weight: 600;
  color: #d0d0d0;
  letter-spacing: -0.5px;
}

/* What we verify */
.section {
  max-width: 1400px;
  margin: 0 auto 140px;
  padding: 0 60px;
}

.section-intro {
  text-align: center;
  margin-bottom: 80px;
}

.section-label {
  font-size: 13px;
  color: #666;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.section-title {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -1.5px;
  margin-bottom: 20px;
}

.section-description {
  font-size: 20px;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

.verify-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.verify-item {
  background: #fafafa;
  border-radius: 8px;
  padding: 40px 32px;
}

.verify-number {
  font-size: 14px;
  font-weight: 700;
  color: #ff6b35;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.verify-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
}

.verify-list {
  list-style: none;
  font-size: 15px;
  color: #666;
  line-height: 1.8;
}

.verify-list li {
  padding: 4px 0;
}

.verify-list li::before {
  content: '·';
  color: #ff6b35;
  font-weight: 700;
  margin-right: 12px;
  font-size: 20px;
}

/* How it works */
.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.process-step {
  text-align: center;
  padding: 32px 24px;
}

.step-number {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #0a0a0a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  margin: 0 auto 24px;
}

.step-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

.step-description {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}

/* Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.testimonial {
  background: #fafafa;
  border-radius: 8px;
  padding: 40px 32px;
}

.testimonial-quote {
  font-size: 16px;
  color: #0a0a0a;
  line-height: 1.7;
  margin-bottom: 28px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #d0d0d0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
  color: #666;
}

.author-name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
}

.author-title {
  font-size: 14px;
  color: #666;
}

/* Partners */
.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  margin-top: 60px;
}

.partner-item {
  text-align: center;
}

.partner-category {
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.partner-name {
  font-size: 16px;
  font-weight: 600;
  color: #0a0a0a;
}

/* CTA */
.cta-section {
  background: #0a0a0a;
  color: white;
  padding: 100px 60px;
  text-align: center;
  margin-top: 140px;
}

.cta-title {
  font-size: 48px;
  font-weight: 800;
  letter-spacing: -1.5px;
  margin-bottom: 24px;
}

.cta-description {
  font-size: 20px;
  color: #999;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background: white;
  color: #0a0a0a;
  padding: 16px 40px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
}

@media (max-width: 768px) {
  .verify-grid, .process-grid, .testimonials-grid, .partners-grid {
    grid-template-columns: 1fr;
  }
}
</style>
</head>
<body>

<!-- Announcement bar -->
<div class="announcement">
  <a href="#">New: Financial modeling tools for verified ideas → Read more</a>
</div>

<!-- Navigation -->
<nav>
  <div class="logo">
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#0a0a0a"/>
      <path d="M8 20 L14 8 L20 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="14" cy="17" r="1.5" fill="white"/>
    </svg>
    LAUNCHMAP
  </div>
  <div class="nav-links">
    <a href="#" class="nav-link">Product</a>
    <a href="#" class="nav-link">Partners</a>
    <a href="pricing.html" class="nav-link">Pricing</a>
    <a href="#" class="book-demo">Get started</a>
  </div>
</nav>

<!-- Hero -->
<div class="hero">
  <h1>
    Verify your business idea<br/>
    <span class="accent">before taking the next step</span>
  </h1>

  <form class="hero-form">
    <input type="email" class="hero-input" placeholder="your@email.com" />
    <button type="submit" class="hero-button">Get started</button>
  </form>

  <p class="hero-note">
    LaunchMap assists you in estimating the market, competitors, and customers before you launch. Get objective data across market size, entry barriers, financial requirements, and competitive landscape — then connect with the right partners to execute.
  </p>
</div>

<!-- Trust badges -->
<div class="trust-section">
  <div class="trust-label">TRUSTED BY FOUNDERS LAUNCHING IN</div>
  <div class="logos">
    <div class="logo-item">Austin</div>
    <div class="logo-item">Miami</div>
    <div class="logo-item">Chicago</div>
    <div class="logo-item">Denver</div>
    <div class="logo-item">Nashville</div>
  </div>
</div>

<!-- What we verify -->
<div class="section">
  <div class="section-intro">
    <div class="section-label">WHAT WE VERIFY</div>
    <h2 class="section-title">Six dimensions of market intelligence</h2>
    <p class="section-description">
      We analyze your business idea across comprehensive data points to give you complete market visibility before you invest.
    </p>
  </div>

  <div class="verify-grid">
    <div class="verify-item">
      <div class="verify-number">01 · MARKET</div>
      <div class="verify-title">Market Size & Demand</div>
      <ul class="verify-list">
        <li>Total addressable market</li>
        <li>Market saturation levels</li>
        <li>Growth trends & projections</li>
        <li>Seasonal demand patterns</li>
      </ul>
    </div>

    <div class="verify-item">
      <div class="verify-number">02 · COMPETITION</div>
      <div class="verify-title">Competitor Landscape</div>
      <ul class="verify-list">
        <li>Active competitor count</li>
        <li>Profile strength analysis</li>
        <li>Market share distribution</li>
        <li>Competitive positioning gaps</li>
      </ul>
    </div>

    <div class="verify-item">
      <div class="verify-number">03 · BARRIERS</div>
      <div class="verify-title">Entry Requirements</div>
      <ul class="verify-list">
        <li>Licensing & certifications</li>
        <li>Regulatory compliance</li>
        <li>Insurance obligations</li>
        <li>Capital requirements</li>
      </ul>
    </div>

    <div class="verify-item">
      <div class="verify-number">04 · CUSTOMERS</div>
      <div class="verify-title">Customer Analysis</div>
      <ul class="verify-list">
        <li>Target demographic profiles</li>
        <li>Acquisition cost estimates</li>
        <li>Buying behavior patterns</li>
        <li>Underserved segments</li>
      </ul>
    </div>

    <div class="verify-item">
      <div class="verify-number">05 · FINANCIALS</div>
      <div class="verify-title">Financial Projections</div>
      <ul class="verify-list">
        <li>Startup cost breakdown</li>
        <li>Operating expenses</li>
        <li>Revenue projections</li>
        <li>Break-even timeline</li>
      </ul>
    </div>

    <div class="verify-item">
      <div class="verify-number">06 · STRATEGY</div>
      <div class="verify-title">Go-to-Market</div>
      <ul class="verify-list">
        <li>Marketing channels</li>
        <li>Partnership opportunities</li>
        <li>Acquisition strategies</li>
        <li>Launch timeline</li>
      </ul>
    </div>
  </div>
</div>

<!-- How it works -->
<div class="section">
  <div class="section-intro">
    <div class="section-label">HOW IT WORKS</div>
    <h2 class="section-title">From signup to verified launch</h2>
    <p class="section-description">
      Four steps from initial idea to market entry, guided by data at every stage.
    </p>
  </div>

  <div class="process-grid">
    <div class="process-step">
      <div class="step-number">1</div>
      <div class="step-title">Register</div>
      <div class="step-description">
        Create account and enter your business idea with target location
      </div>
    </div>

    <div class="process-step">
      <div class="step-number">2</div>
      <div class="step-title">AI Analysis</div>
      <div class="step-description">
        System scans market data across six key verification dimensions
      </div>
    </div>

    <div class="process-step">
      <div class="step-number">3</div>
      <div class="step-title">Review</div>
      <div class="step-description">
        Receive objective findings with both criticism and opportunities
      </div>
    </div>

    <div class="process-step">
      <div class="step-number">4</div>
      <div class="step-title">Execute</div>
      <div class="step-description">
        Upgrade for full plan and partner introductions if viable
      </div>
    </div>
  </div>
</div>

<!-- Testimonials -->
<div class="section">
  <div class="section-intro">
    <div class="section-label">CUSTOMER STORIES</div>
    <h2 class="section-title">Verified before launch</h2>
    <p class="section-description">
      Founders who used LaunchMap to validate their ideas before committing capital.
    </p>
  </div>

  <div class="testimonials-grid">
    <div class="testimonial">
      <div class="testimonial-quote">
        "LaunchMap showed me Austin's mortgage market had weak digital competition. That insight shaped my entire GTM — I focused on Google Local Services and it paid off immediately."
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">MR</div>
        <div>
          <div class="author-name">Michael Rodriguez</div>
          <div class="author-title">Mortgage Broker, Austin</div>
        </div>
      </div>
    </div>

    <div class="testimonial">
      <div class="testimonial-quote">
        "The analysis showed Miami's PI market was oversaturated with 89 established firms. Saved me $75K in startup costs and 6 months. Now exploring a different market."
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">JC</div>
        <div>
          <div class="author-name">Jennifer Chen</div>
          <div class="author-title">Attorney, Miami</div>
        </div>
      </div>
    </div>

    <div class="testimonial">
      <div class="testimonial-quote">
        "LaunchMap identified 12 agents with weak online presence who were perfect partners. Reached out to all before launch — closed 3 partnerships in the first month."
      </div>
      <div class="testimonial-author">
        <div class="author-avatar">DP</div>
        <div>
          <div class="author-name">David Patterson</div>
          <div class="author-title">Insurance Broker, Chicago</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Partners -->
<div class="section">
  <div class="section-intro">
    <div class="section-label">PARTNER NETWORK</div>
    <h2 class="section-title">Connections that accelerate launch</h2>
    <p class="section-description">
      When your idea is verified, we connect you with trusted partners across legal, financial, and operational domains.
    </p>
  </div>

  <div class="partners-grid">
    <div class="partner-item">
      <div class="partner-category">Legal</div>
      <div class="partner-name">LegalZoom</div>
    </div>
    <div class="partner-item">
      <div class="partner-category">Licensing</div>
      <div class="partner-name">NMLS Partners</div>
    </div>
    <div class="partner-item">
      <div class="partner-category">Accounting</div>
      <div class="partner-name">Bench</div>
    </div>
    <div class="partner-item">
      <div class="partner-category">Insurance</div>
      <div class="partner-name">Hiscox</div>
    </div>
    <div class="partner-item">
      <div class="partner-category">Marketing</div>
      <div class="partner-name">Google LSA</div>
    </div>
    <div class="partner-item">
      <div class="partner-category">CRM</div>
      <div class="partner-name">HubSpot</div>
    </div>
    <div class="partner-item">
      <div class="partner-category">Banking</div>
      <div class="partner-name">Mercury</div>
    </div>
    <div class="partner-item">
      <div class="partner-category">Web</div>
      <div class="partner-name">Webflow</div>
    </div>
  </div>
</div>

<!-- CTA -->
<div class="cta-section">
  <h2 class="cta-title">Ready to verify your idea?</h2>
  <p class="cta-description">
    Join founders who saved time and capital by validating before launch.
  </p>
  <a href="#" class="cta-button">Get started →</a>
</div>

</body>
</html>

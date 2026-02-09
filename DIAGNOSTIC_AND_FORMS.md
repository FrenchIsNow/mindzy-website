# Diagnostic & Multistep Forms Documentation

This document provides a comprehensive overview of all diagnostic quizzes and multistep forms implemented in the Mindzy website.

## Overview

The codebase includes three main types of interactive forms:
1. **DiagnosticQuiz** - Standard and custom diagnostic assessments
2. **OnboardingWizard** - Plan recommendation wizard
3. **ProfileQuiz** - Profile-specific questionnaires with contact form

---

## 1. DiagnosticQuiz

**Location:** `src/components/features/DiagnosticQuiz.tsx`  
**Page Route:** `/[locale]/diagnostic`  
**Config:** `src/lib/config.ts` (`diagnosticQuestions`, `customDiagnosticQuestions`)

### Standard Diagnostic Quiz

**Purpose:** Assesses user's current digital presence and recommends a plan.

**Questions (4 total):**
1. `has-website` - Do you already have a website?
   - Options: Yes (2), No (0), Yes but outdated (1)
2. `has-booking` - Do you have online booking?
   - Options: Yes (2), No (0), Basic (1)
3. `has-gmb` - Do you have a Google Business profile?
   - Options: Yes, optimized (2), Yes, not optimized (1), No (0)
4. `weekly-requests` - How many appointment requests per week?
   - Options: More than 10 (2), 5 to 10 (1), Less than 5 (0)

**Scoring:**
- Total score calculated from sum of all answers (max: 8)
- Percentage: `(total / max) * 100`
- Results:
  - `< 40%` → `low` level → Recommends `pro` plan
  - `40-70%` → `medium` level → Recommends `business` plan
  - `> 70%` → `high` level → Recommends `basic` plan

**Result Display:**
- Shows level-based message (low/medium/high)
- CTA button links to: `/[locale]/onboarding?recommendation={planId}`
- Includes restart option

**Analytics:**
- `analytics.cta.diagnosticStart()` - On first question
- `analytics.cta.diagnosticStep(step, total)` - Each step
- `analytics.cta.diagnosticComplete(score, level, recommendation)` - On completion

### Custom Diagnostic Quiz

**Trigger:** When `profile="custom"` prop is passed  
**Purpose:** Assesses custom project requirements for web/mobile applications

**Questions (7 total):**
1. `platform-type` - What type of project?
   - Web app, Mobile app, Cross-platform, Unsure
2. `project-maturity` - Project maturity level?
   - Just an idea (0), Validated idea (1), Specs ready (2), Existing MVP (2)
3. `technical-complexity` - Key technical features needed?
   - Basic CRUD (0), Auth + APIs + Payments (1), Real-time/AI/Geo (2), Enterprise (2)
4. `target-audience` - Who will use it?
   - B2C (2), B2B (2), Internal tool (1), Marketplace (2)
5. `timeline-budget` - Launch timeline?
   - < 1 month (2), 1-3 months (2), 3-6 months (1), Exploring (0)
6. `existing-tech` - Existing technical foundation?
   - Nothing (0), UI/UX mockups (1), Prototype/MVP (2), Full app to redesign (2)

**Scoring:**
- Total score calculated from sum (max: 14)
- Percentage: `(total / max) * 100`
- Results:
  - `< 35%` → `low` level → "Project in conception phase"
  - `35-65%` → `medium` level → "Well-defined project"
  - `> 65%` → `high` level → "Project ready for takeoff"
- Always recommends `custom` plan

**Result Display:**
- Shows custom result messages based on level
- Displays project summary with selected answers
- CTA links to: `/[locale]/profil/custom`
- Includes restart option

**Analytics:** Same as standard diagnostic

---

## 2. OnboardingWizard

**Location:** `src/components/features/OnboardingWizard.tsx`  
**Page Route:** `/[locale]/onboarding`  
**Config:** `src/lib/config.ts` (`onboardingSteps`)

**Purpose:** Collects user preferences and recommends a specific plan.

**Questions (4 total):**
1. `objective` - What is your main objective?
   - Increase visibility, Automate bookings, Sell products/services, Strengthen credibility
2. `assets` - What brand elements do you have?
   - Professional logo, Brand guidelines, Nothing yet
3. `booking` - Do you need online booking?
   - Yes (essential), No
4. `payments` - Do you want to accept online payments?
   - Yes, No

**Plan Recommendation Logic:**
```typescript
function recommendPlan(answers: Record<string, string>): Plan['id'] {
  if (answers.payments === 'yes' && answers.objective === 'sales') return 'ecommerce'
  if (answers.payments === 'yes') return 'business'
  if (answers.booking === 'yes' || answers.objective === 'booking') return 'pro'
  return 'basic'
}
```

**Result Display:**
- Shows recommended plan with badge
- Displays plan details: price, setup fee, features
- Features list: pages, articles, booking, payments, Google Business
- CTAs:
  - Primary: Calendly link (meeting booking)
  - Secondary: Contract link (`/[locale]/legal/cgv?plan={planId}`)
  - Restart button

**Initial Recommendation:**
- Can accept `initialRecommendation` prop from URL query
- If provided, uses that plan instead of calculating

**Analytics:**
- `analytics.onboarding.start(recommendation)` - On first question
- `analytics.onboarding.stepComplete(step, questionId)` - Each step
- `analytics.onboarding.complete(planId)` - On completion
- `analytics.calendly.click('onboarding_result')` - On Calendly CTA
- `analytics.lead.generate('onboarding', planId)` - On Calendly CTA
- `analytics.cta.click('contract_cta', 'onboarding_result')` - On contract CTA

---

## 3. ProfileQuiz

**Location:** `src/components/features/ProfileQuiz.tsx`  
**Page Route:** `/[locale]/profil/[profileType]`  
**Config:** `src/lib/config.ts` (`profileQuestions`)

**Purpose:** Collects detailed information for specific profile types, then captures contact info.

**Profile Types:**
- `beginner` - For users new to websites
- `pro` - For users with existing sites needing upgrade
- `booking` - For users needing booking functionality
- `sales` - For users wanting e-commerce
- `custom` - For custom project requirements

### Beginner Profile (5 questions + contact)

1. `profession` - What is your profession?
   - Therapist/Wellness, Coach/Consultant, Craftsman/Creator, Restaurant/Retail, Other
2. `online-presence` - Do you have online presence?
   - Nothing, Social media only, Google Business Profile, Simple page
3. `timeline` - When do you want to launch?
   - ASAP, 1-3 months, 3-6 months, Not decided
4. `priority` - What matters most?
   - Professional image, Online bookings, Google visibility, All of the above
5. `budget` - What budget?
   - < €1,000, €1,000-2,000, €2,000-5,000, €5,000+

### Pro Profile (5 questions + contact)

1. `site-type` - What type of site do you have?
   - WordPress, Wix/Squarespace, Custom website, Other
2. `main-issue` - Main problem with your site?
   - Outdated design, Too slow, Not mobile-friendly, Invisible on Google, Low conversions
3. `features-needed` - What features do you need?
   - Modern design, Online booking, E-commerce, Blog & SEO, All
4. `urgency` - How urgent is the redesign?
   - Urgent ASAP, 1-3 months, 3-6 months, Just exploring
5. `budget` - What budget?
   - Same options as beginner

### Booking Profile (5 questions + contact)

1. `profession` - What is your profession?
   - Therapist/Practitioner, Coach/Consultant, Beauty/Wellness, Healthcare, Other
2. `current-method` - How do you manage appointments?
   - Phone, Email/Messages, Social media, Paper agenda, Online tool
3. `monthly-appointments` - How many appointments per month?
   - < 20, 20-50, 50-100, 100+
4. `automation-needs` - What do you want to automate?
   - Bookings only, Bookings + payments, Full CRM, Not sure
5. `has-website` - Do you have a website?
   - Yes up to date, Yes but outdated, No not yet

### Sales Profile (5 questions + contact)

1. `product-type` - What do you want to sell?
   - Physical products, Digital products, Services, Mix
2. `product-count` - How many products/services?
   - < 10, 10-50, 50-200, 200+
3. `current-sales` - How do you currently sell?
   - Not online yet, Via social media, Marketplace, Own website
4. `payment-needs` - What payment methods?
   - Credit card, Card + PayPal + transfer, Recurring/Subscriptions, Not sure
5. `budget` - What budget?
   - Same options as beginner

### Custom Profile (6 questions + contact)

1. `project-type` - What type of project?
   - Web app (SaaS/platform), Mobile app, Cross-platform, Unsure
2. `project-stage` - What stage is your project?
   - Just an idea, Specs/mockups ready, MVP to improve, Existing app to redesign
3. `target-users` - Who are target users?
   - B2C, B2B, Internal tool, Marketplace
4. `key-features` - What key feature is priority?
   - Auth + dashboard, Payments/subscriptions, Real-time, API integrations, AI
5. `timeline` - What is your desired timeline?
   - < 1 month, 1-3 months, 3-6 months, 6+ months
6. `budget` - What budget for this project?
   - < €5,000, €5,000-10,000, €10,000-25,000, €25,000+

### Contact Form Step

After all questions, users fill out contact information:
- Full name (required)
- Email (required, validated)
- Phone (required)
- Message (optional)

**Form Submission:**
- POSTs to `/api/leads`
- Payload includes: `profileType`, `locale`, contact fields, and all answers
- Success: Shows thank you message with link to homepage
- Error: Shows error message with retry option

**Analytics:**
- `analytics.profile.quizStart()` - On first question
- `analytics.lead.generate('profile_quiz', profileType)` - On successful submit
- `analytics.lead.formSubmit('profile_quiz', success)` - On submit (true/false)

---

## Common Features

All forms share these common UI/UX patterns:

### Progress Indicator
- Shows current step / total steps
- Progress bar with percentage
- Smooth transitions between steps

### Navigation
- Back button (when not on first step)
- Auto-advance after answer selection (300ms delay)
- Restart functionality on result screens

### Styling
- Uses Card component with `variant="elevated"`
- Violet accent color for selected states
- Responsive grid layouts (1 column mobile, 2 columns desktop for options)
- Icons support for visual enhancement

### Multilingual Support
- All content supports `fr`, `en`, `es` locales
- Questions, options, and result messages are localized
- Uses `copy[locale]` pattern from `src/lib/copy.ts`

### Analytics Integration
- Comprehensive event tracking throughout user journey
- Tracks starts, step completions, and final submissions
- Integrates with lead generation system

---

## Data Flow

### DiagnosticQuiz Flow
```
User starts → Answer questions → Calculate score → Show result → 
CTA to onboarding (or custom profile) → User continues
```

### OnboardingWizard Flow
```
User starts (with optional recommendation) → Answer questions → 
Calculate/use plan recommendation → Show plan details → 
CTA to Calendly or contract
```

### ProfileQuiz Flow
```
User starts → Answer profile questions → Contact form → 
Submit to API → Success/Error screen → Return to home
```

---

## API Endpoints

### `/api/leads` (POST)
**Used by:** ProfileQuiz

**Payload:**
```typescript
{
  profileType: ProfileKey
  locale: Locale
  fullName: string
  email: string
  phone: string
  message?: string
  ...answers // All question answers as key-value pairs
}
```

**Response:**
- Success: 200 OK
- Error: 4xx/5xx with error message

---

## Configuration Files

### `src/lib/config.ts`
- `diagnosticQuestions` - Standard diagnostic questions
- `customDiagnosticQuestions` - Custom project diagnostic questions
- `onboardingSteps` - Onboarding wizard steps
- `profileQuestions` - Profile-specific questions (by profile type)

### `src/lib/types.ts`
- `DiagnosticQuestion` - Question structure
- `DiagnosticResult` - Result structure
- `OnboardingStep` - Step structure
- `ProfileQuestion` - Profile question structure

### `src/lib/copy.ts`
- Localized strings for all forms
- Result messages
- Button labels
- Error messages

---

## Usage Examples

### DiagnosticQuiz
```tsx
<DiagnosticQuiz locale="fr" />
<DiagnosticQuiz locale="en" profile="custom" />
```

### OnboardingWizard
```tsx
<OnboardingWizard locale="fr" />
<OnboardingWizard locale="en" initialRecommendation="pro" />
```

### ProfileQuiz
```tsx
<ProfileQuiz locale="fr" profileType="beginner" />
<ProfileQuiz locale="en" profileType="booking" />
<ProfileQuiz locale="es" profileType="custom" />
```

---

## Future Enhancements

Potential improvements:
- Save progress in localStorage
- Resume incomplete forms
- Email results to user
- A/B testing different question orders
- Dynamic question branching based on answers
- Integration with CRM systems
- Export results as PDF

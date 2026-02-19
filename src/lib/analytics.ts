declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID) return
  window.gtag('config', GA_MEASUREMENT_ID, { page_path: url })
}

export function event(action: string, params?: Record<string, unknown>) {
  if (!GA_MEASUREMENT_ID) return
  window.gtag('event', action, params)
}

export const analytics = {
  cta: {
    click: (ctaName: string, location: string) =>
      event('cta_click', {
        cta_name: ctaName,
        cta_location: location,
        event_category: 'conversion',
      }),
    diagnosticStart: () =>
      event('diagnostic_start', {
        event_category: 'conversion',
        event_label: 'diagnostic_quiz',
      }),
    diagnosticComplete: (score: number, level: string, recommendation: string) =>
      event('diagnostic_complete', {
        event_category: 'conversion',
        event_label: 'diagnostic_quiz',
        score,
        result_level: level,
        recommended_plan: recommendation,
      }),
    diagnosticStep: (step: number, total: number) =>
      event('diagnostic_progress', {
        event_category: 'engagement',
        step_number: step,
        total_steps: total,
        progress_percent: Math.round((step / total) * 100),
      }),
  },

  whatsapp: {
    click: (source: string) =>
      event('whatsapp_click', {
        event_category: 'conversion',
        click_source: source,
        outbound: true,
      }),
  },

  calendly: {
    click: (source: string) =>
      event('calendly_click', {
        event_category: 'conversion',
        click_source: source,
        outbound: true,
      }),
  },

  chatbot: {
    open: () =>
      event('chatbot_open', { event_category: 'engagement' }),
    close: () =>
      event('chatbot_close', { event_category: 'engagement' }),
    quickReply: (replyType: string) =>
      event('chatbot_quick_reply', {
        event_category: 'engagement',
        reply_type: replyType,
      }),
    ctaClick: (ctaType: string) =>
      event('chatbot_cta_click', {
        event_category: 'conversion',
        cta_type: ctaType,
      }),
  },

  pricing: {
    viewPlans: () =>
      event('view_pricing', { event_category: 'engagement' }),
    selectPlan: (planId: string, price: number) =>
      event('select_plan', {
        event_category: 'conversion',
        plan_id: planId,
        plan_price: price,
        currency: 'EUR',
      }),
    beginCheckout: (planId: string, price: number) =>
      event('begin_checkout', {
        event_category: 'conversion',
        items: [{ item_id: planId, item_name: planId, price, currency: 'EUR' }],
        value: price,
        currency: 'EUR',
      }),
  },

  portfolio: {
    view: (itemId: string, category: string) =>
      event('portfolio_view', {
        event_category: 'engagement',
        item_id: itemId,
        item_category: category,
      }),
    filter: (filterType: string, filterValue: string) =>
      event('portfolio_filter', {
        event_category: 'engagement',
        filter_type: filterType,
        filter_value: filterValue,
      }),
  },

  blog: {
    readArticle: (slug: string, title: string) =>
      event('blog_read', {
        event_category: 'engagement',
        article_slug: slug,
        article_title: title,
      }),
    scrollDepth: (slug: string, percent: number) =>
      event('blog_scroll_depth', {
        event_category: 'engagement',
        article_slug: slug,
        scroll_percent: percent,
      }),
  },


  lead: {
    generate: (source: string, planId?: string) =>
      event('generate_lead', {
        event_category: 'conversion',
        lead_source: source,
        plan_id: planId,
        currency: 'EUR',
      }),
    formSubmit: (formName: string, success?: boolean) =>
      event('form_submit', {
        event_category: 'conversion',
        form_name: formName,
        form_success: success,
      }),
  },

  navigation: {
    menuClick: (item: string) =>
      event('menu_click', {
        event_category: 'navigation',
        menu_item: item,
      }),
    languageSwitch: (from: string, to: string) =>
      event('language_switch', {
        event_category: 'navigation',
        from_language: from,
        to_language: to,
      }),
  },

  scroll: {
    sectionView: (sectionName: string) =>
      event('section_view', {
        event_category: 'engagement',
        section_name: sectionName,
      }),
  },

  profile: {
    quizStart: () =>
      event('profile_quiz_start', { event_category: 'engagement' }),
    quizComplete: (profileType: string) =>
      event('profile_quiz_complete', {
        event_category: 'engagement',
        profile_type: profileType,
      }),
  },

  footer: {
    linkClick: (section: string, label: string) =>
      event('footer_link_click', {
        event_category: 'navigation',
        link_section: section,
        link_label: label,
      }),
    socialClick: (platform: string) =>
      event('social_click', {
        event_category: 'engagement',
        social_platform: platform,
        outbound: true,
      }),
    emailClick: () =>
      event('email_click', {
        event_category: 'conversion',
        outbound: true,
      }),
  },

  external: {
    linkClick: (url: string, label: string, source: string) =>
      event('outbound_click', {
        event_category: 'engagement',
        link_url: url,
        link_label: label,
        click_source: source,
        outbound: true,
      }),
  },

  consent: {
    update: (granted: boolean) =>
      event('consent_update', {
        event_category: 'privacy',
        analytics_granted: granted,
      }),
  },
}

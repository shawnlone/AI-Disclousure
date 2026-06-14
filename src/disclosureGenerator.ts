export type ContentType =
  | 'blog'
  | 'youtube'
  | 'game'
  | 'kdp'
  | 'client'
  | 'education'
  | 'marketing'
  | 'website-image'
  | 'other'

export type AiTool =
  | 'ChatGPT'
  | 'Claude'
  | 'Gemini'
  | 'Midjourney'
  | 'Grok'
  | 'DeepSeek'
  | 'Stable Diffusion'
  | 'Other'

export type AiUse =
  | 'brainstorming'
  | 'drafting'
  | 'editing'
  | 'translation'
  | 'image generation'
  | 'code assistance'
  | 'research support'
  | 'voice/video generation'

export type ReviewLevel = 'fully reviewed' | 'partially reviewed' | 'not reviewed'
export type Tone = 'short' | 'friendly' | 'formal' | 'platform-safe'
export type OutputLanguage = 'English' | '中文' | 'Bilingual'

export type DisclosureInput = {
  contentType: ContentType
  tools: AiTool[]
  uses: AiUse[]
  reviewLevel: ReviewLevel
  tone: Tone
  language: OutputLanguage
}

export type GeneratedDisclosure = {
  primaryStatement: string
  shortVersion: string
  structuredVersion: string[]
  riskNotes: string[]
}

export const contentTypeLabels: Record<ContentType, { en: string; zh: string }> = {
  blog: { en: 'Blog post', zh: '博客文章' },
  youtube: { en: 'YouTube video', zh: 'YouTube 视频' },
  game: { en: 'Steam/Game page', zh: 'Steam/游戏页面' },
  kdp: { en: 'Amazon KDP book', zh: 'Amazon KDP 图书' },
  client: { en: 'Client work', zh: '客户交付' },
  education: { en: 'Course/Education', zh: '课程/教育材料' },
  marketing: { en: 'Marketing material', zh: '营销材料' },
  'website-image': { en: 'Website image', zh: '网站图片' },
  other: { en: 'Other content', zh: '其他内容' },
}

export const aiUseLabels: Record<AiUse, { en: string; zh: string }> = {
  brainstorming: { en: 'brainstorming', zh: '构思' },
  drafting: { en: 'drafting', zh: '起草' },
  editing: { en: 'editing', zh: '编辑润色' },
  translation: { en: 'translation', zh: '翻译' },
  'image generation': { en: 'image generation', zh: '图像生成' },
  'code assistance': { en: 'code assistance', zh: '代码辅助' },
  'research support': { en: 'research support', zh: '资料整理' },
  'voice/video generation': { en: 'voice/video generation', zh: '音视频生成' },
}

export const defaultInput: DisclosureInput = {
  contentType: 'game',
  tools: ['ChatGPT'],
  uses: ['drafting', 'editing'],
  reviewLevel: 'fully reviewed',
  tone: 'platform-safe',
  language: 'English',
}

export const exampleInput: DisclosureInput = {
  contentType: 'kdp',
  tools: ['ChatGPT', 'Midjourney'],
  uses: ['drafting', 'image generation'],
  reviewLevel: 'partially reviewed',
  tone: 'platform-safe',
  language: 'Bilingual',
}

const reviewCopy = {
  'fully reviewed': {
    en: 'All final content was reviewed, edited, and approved by a human before publication.',
    zh: '所有最终内容在发布前均经过人工审核、编辑和确认。',
  },
  'partially reviewed': {
    en: 'The final content was partially reviewed and edited by a human before publication.',
    zh: '最终内容在发布前经过了部分人工审核和编辑。',
  },
  'not reviewed': {
    en: 'Some AI-assisted content may not have received full human review before publication.',
    zh: '部分 AI 辅助内容可能尚未经过完整人工审核。',
  },
} satisfies Record<ReviewLevel, { en: string; zh: string }>

const contextCopy = {
  blog: {
    en: 'This article was created with assistance from AI tools.',
    zh: '本文在创作过程中使用了 AI 工具辅助。',
  },
  youtube: {
    en: 'This video and its supporting materials were created with assistance from AI tools.',
    zh: '本视频及相关辅助材料在制作过程中使用了 AI 工具辅助。',
  },
  game: {
    en: 'This game page describes content that was created with assistance from AI tools.',
    zh: '本游戏页面所展示或说明的部分内容使用了 AI 工具辅助创作。',
  },
  kdp: {
    en: 'This book project was prepared with assistance from AI tools.',
    zh: '本图书项目在准备过程中使用了 AI 工具辅助。',
  },
  client: {
    en: 'This client deliverable was prepared with assistance from AI tools.',
    zh: '本客户交付内容在制作过程中使用了 AI 工具辅助。',
  },
  education: {
    en: 'This educational material was prepared with assistance from AI tools.',
    zh: '本教育材料在准备过程中使用了 AI 工具辅助。',
  },
  marketing: {
    en: 'This marketing material was created with assistance from AI tools.',
    zh: '本营销材料在制作过程中使用了 AI 工具辅助。',
  },
  'website-image': {
    en: 'This website includes visual content created with assistance from AI tools.',
    zh: '本网站包含使用 AI 工具辅助生成或处理的视觉内容。',
  },
  other: {
    en: 'This content was created with assistance from AI tools.',
    zh: '本内容在创作过程中使用了 AI 工具辅助。',
  },
} satisfies Record<ContentType, { en: string; zh: string }>

const platformGuidance = {
  game: {
    en: 'For a Steam or game storefront, describe where AI appears in player-facing assets, store copy, screenshots, concept art, code support, or other published material.',
    zh: '用于 Steam 或游戏商店页面时，建议说明 AI 出现在玩家可见素材、商店文案、截图、概念图、代码辅助或其他发布材料中的哪些位置。',
  },
  youtube: {
    en: 'For YouTube, add extra detail if AI created realistic altered or synthetic visuals, voices, events, or scenes that viewers could mistake for real footage.',
    zh: '用于 YouTube 时，如果 AI 生成了容易被观众误认为真实的画面、声音、事件或场景，应补充更明确的说明。',
  },
  kdp: {
    en: 'For KDP, separate AI-generated material from AI-assisted work. Generated images, translated text, or substantial generated passages may need more explicit wording.',
    zh: '用于 KDP 时，建议区分 AI 生成内容和 AI 辅助内容。AI 生成图片、翻译文本或大段生成文字通常需要更明确说明。',
  },
  client: {
    en: 'For client work, keep the note specific enough for handoff: name the tools, what they assisted with, and what was reviewed by a human.',
    zh: '用于客户交付时，建议写清工具名称、AI 辅助环节，以及哪些内容经过人工审核。',
  },
  blog: {
    en: 'For public posts, use plain language and avoid overstating either human-only authorship or AI autonomy.',
    zh: '用于公开文章时，建议使用清楚的日常语言，不夸大纯人工创作，也不夸大 AI 的自主作用。',
  },
  education: {
    en: 'For education, follow the instructor, school, or publisher policy before submitting.',
    zh: '用于教育场景时，提交前应优先遵守教师、学校或出版方规则。',
  },
  marketing: {
    en: 'For marketing, avoid implying that AI-generated examples, testimonials, people, or results are real unless they are verified.',
    zh: '用于营销材料时，避免让 AI 生成的案例、评价、人物或结果被误认为真实且已验证。',
  },
  'website-image': {
    en: 'For website images, mention generated or AI-edited visual assets when they represent products, people, places, or examples.',
    zh: '用于网站图片时，如果图像代表产品、人物、地点或案例，应说明其为 AI 生成或 AI 辅助处理。',
  },
  other: {
    en: 'Adapt the wording to the rules of the platform, client, or publisher where the content will appear.',
    zh: '请根据内容发布平台、客户或出版方的规则调整措辞。',
  },
} satisfies Record<ContentType, { en: string; zh: string }>

function joinList(items: string[], locale: 'en' | 'zh') {
  if (items.length === 0) return locale === 'en' ? 'AI assistance' : 'AI 辅助'
  if (locale === 'zh') return items.join('、')
  if (items.length === 1) return items[0]
  return `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`
}

function buildUseSentence(input: DisclosureInput, locale: 'en' | 'zh') {
  const tools = joinList(input.tools, locale)
  const uses = joinList(
    input.uses.map((use) => aiUseLabels[use][locale]),
    locale,
  )

  if (locale === 'zh') {
    return `${tools} 被用于${uses}。`
  }

  return `${tools} ${input.tools.length === 1 ? 'was' : 'were'} used for ${uses}.`
}

function applyTone(statement: string, input: DisclosureInput, locale: 'en' | 'zh') {
  if (input.tone === 'short') return statement

  if (input.tone === 'formal') {
    return locale === 'zh'
      ? `${statement} 本说明仅用于透明披露 AI 辅助使用情况，不构成法律意见。`
      : `${statement} This statement is provided for transparency and does not constitute legal advice.`
  }

  if (input.tone === 'platform-safe') {
    return locale === 'zh'
      ? `${statement} 如平台或客户要求更详细说明，应以其最新规则为准。`
      : `${statement} If a platform or client requires more detailed disclosure, its current rules should be followed.`
  }

  return locale === 'zh'
    ? `${statement} 我们希望清楚说明 AI 在创作流程中的辅助作用。`
    : `${statement} We want to be clear about how AI assisted the creative process.`
}

function buildPrimary(input: DisclosureInput, locale: 'en' | 'zh') {
  const base = [
    contextCopy[input.contentType][locale],
    buildUseSentence(input, locale),
    reviewCopy[input.reviewLevel][locale],
  ].join(locale === 'zh' ? '' : ' ')

  return applyTone(base, input, locale)
}

function buildShort(input: DisclosureInput, locale: 'en' | 'zh') {
  const uses = joinList(
    input.uses.map((use) => aiUseLabels[use][locale]),
    locale,
  )
  const tools = joinList(input.tools, locale)

  if (locale === 'zh') {
    return `AI 披露：本${contentTypeLabels[input.contentType].zh}使用 ${tools} 辅助${uses}；人工审核状态：${reviewCopy[input.reviewLevel].zh}`
  }

  return `AI disclosure: ${tools} assisted with ${uses} for this ${contentTypeLabels[input.contentType].en.toLowerCase()}; human review status: ${input.reviewLevel}.`
}

function buildStructured(input: DisclosureInput, locale: 'en' | 'zh') {
  if (locale === 'zh') {
    return [
      `内容类型：${contentTypeLabels[input.contentType].zh}`,
      `使用的 AI 工具：${joinList(input.tools, 'zh')}`,
      `AI 用途：${joinList(input.uses.map((use) => aiUseLabels[use].zh), 'zh')}`,
      `人工审核：${reviewCopy[input.reviewLevel].zh}`,
      `平台提示：${platformGuidance[input.contentType].zh}`,
    ]
  }

  return [
    `Content type: ${contentTypeLabels[input.contentType].en}`,
    `AI tools used: ${joinList(input.tools, 'en')}`,
    `AI use: ${joinList(input.uses.map((use) => aiUseLabels[use].en), 'en')}`,
    `Human review: ${input.reviewLevel}`,
    `Platform note: ${platformGuidance[input.contentType].en}`,
  ]
}

function riskNotes(input: DisclosureInput) {
  const notes: string[] = []

  if (input.reviewLevel === 'not reviewed') {
    notes.push(
      'High clarity recommended: because the output was not fully human-reviewed, use direct wording and avoid implying human-only authorship.',
    )
  }

  if (input.contentType === 'game') {
    notes.push(
      'Steam/game storefront note: be specific about whether AI appears in art, store copy, dialogue, code support, audio, or other player-facing content.',
    )
  }

  if (input.contentType === 'kdp') {
    notes.push(
      'KDP note: distinguish AI-generated material from AI-assisted work before submitting the publishing form.',
    )
  }

  if (input.contentType === 'youtube') {
    notes.push(
      'YouTube note: realistic altered or synthetic visuals, voices, scenes, or events may need a more explicit disclosure.',
    )
  }

  if (input.contentType === 'client') {
    notes.push(
      'Client handoff note: clients usually care most about what AI touched and what a human reviewed.',
    )
  }

  if (
    input.uses.includes('image generation') ||
    input.uses.includes('voice/video generation')
  ) {
    notes.push(
      'Generated media may need extra detail when it resembles real people, brands, copyrighted characters, or real events.',
    )
  }

  return notes
}

export function generateDisclosure(input: DisclosureInput): GeneratedDisclosure {
  if (input.language === '中文') {
    return {
      primaryStatement: buildPrimary(input, 'zh'),
      shortVersion: buildShort(input, 'zh'),
      structuredVersion: buildStructured(input, 'zh'),
      riskNotes: riskNotes(input),
    }
  }

  if (input.language === 'Bilingual') {
    return {
      primaryStatement: `${buildPrimary(input, 'en')}\n\n${buildPrimary(input, 'zh')}`,
      shortVersion: `${buildShort(input, 'en')}\n${buildShort(input, 'zh')}`,
      structuredVersion: [...buildStructured(input, 'en'), ...buildStructured(input, 'zh')],
      riskNotes: riskNotes(input),
    }
  }

  return {
    primaryStatement: buildPrimary(input, 'en'),
    shortVersion: buildShort(input, 'en'),
    structuredVersion: buildStructured(input, 'en'),
    riskNotes: riskNotes(input),
  }
}

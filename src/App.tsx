import {
  AlertTriangle,
  BadgeCheck,
  Blocks,
  BookOpen,
  BriefcaseBusiness,
  Brain,
  CheckCircle2,
  CheckCheck,
  CircleDashed,
  Clipboard,
  Coffee,
  Code2,
  FileCheck2,
  FileText,
  Gamepad2,
  GraduationCap,
  Image,
  Languages,
  LayoutDashboard,
  Megaphone,
  MoreHorizontal,
  Palette,
  PenLine,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  TextCursorInput,
  Video,
  Wand2,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import './App.css'
import {
  type AiTool,
  type AiUse,
  type ContentType,
  type DisclosureInput,
  type OutputLanguage,
  type ReviewLevel,
  type Tone,
  contentTypeLabels,
  defaultInput,
  exampleInput,
  generateDisclosure,
} from './disclosureGenerator'
import { buildMailto, siteConfig } from './siteConfig'

type UiLanguage = 'en' | 'zh'

const contentTypes: ContentType[] = [
  'game',
  'youtube',
  'kdp',
  'client',
  'blog',
  'website-image',
  'marketing',
  'other',
]

const aiTools: AiTool[] = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Midjourney',
  'DALL-E',
  'Stable Diffusion',
  'Runway',
  'Other',
]

const aiUses: AiUse[] = [
  'brainstorming',
  'drafting',
  'editing',
  'translation',
  'image generation',
  'code assistance',
  'research support',
  'voice/video generation',
]

const reviewLevels: ReviewLevel[] = [
  'fully reviewed',
  'partially reviewed',
  'not reviewed',
]

const tones: Tone[] = ['short', 'friendly', 'formal', 'platform-safe']
const outputLanguages: OutputLanguage[] = ['English', '中文', 'Bilingual']

const contentTypeIcons: Record<ContentType, LucideIcon> = {
  blog: FileText,
  youtube: Video,
  game: Gamepad2,
  kdp: BookOpen,
  client: BriefcaseBusiness,
  education: GraduationCap,
  marketing: Megaphone,
  'website-image': Image,
  other: MoreHorizontal,
}

const aiUseIcons: Record<AiUse, LucideIcon> = {
  brainstorming: Brain,
  drafting: PenLine,
  editing: TextCursorInput,
  translation: Languages,
  'image generation': Palette,
  'code assistance': Code2,
  'research support': Search,
  'voice/video generation': Video,
}

const reviewIcons: Record<ReviewLevel, LucideIcon> = {
  'fully reviewed': CheckCheck,
  'partially reviewed': CircleDashed,
  'not reviewed': AlertTriangle,
}

const toneIcons: Record<Tone, LucideIcon> = {
  short: FileText,
  friendly: Sparkles,
  formal: FileCheck2,
  'platform-safe': ShieldCheck,
}

const reviewLabels: Record<ReviewLevel, Record<UiLanguage, string>> = {
  'fully reviewed': { en: 'Fully reviewed', zh: '完整人工审核' },
  'partially reviewed': { en: 'Partial review', zh: '部分人工审核' },
  'not reviewed': { en: 'Not reviewed', zh: '未人工审核' },
}

const toneLabels: Record<Tone, Record<UiLanguage, string>> = {
  short: { en: 'Short', zh: '简短' },
  friendly: { en: 'Friendly', zh: '友好' },
  formal: { en: 'Formal', zh: '正式' },
  'platform-safe': { en: 'Platform-safe', zh: '平台稳妥' },
}

const useLabels: Record<AiUse, Record<UiLanguage, string>> = {
  brainstorming: { en: 'Brainstorming', zh: '构思' },
  drafting: { en: 'Drafting', zh: '起草' },
  editing: { en: 'Editing', zh: '编辑润色' },
  translation: { en: 'Translation', zh: '翻译' },
  'image generation': { en: 'Image generation', zh: '图像生成' },
  'code assistance': { en: 'Code assistance', zh: '代码辅助' },
  'research support': { en: 'Research support', zh: '研究辅助' },
  'voice/video generation': { en: 'Voice/video', zh: '音视频生成' },
}

const copy = {
  en: {
    navTemplates: 'Templates',
    navSponsor: 'Sponsor',
    navAbout: 'About',
    navPrivacy: 'Privacy',
    navContact: 'Contact',
    brandSub: 'Platform disclosure workspace',
    eyebrow: 'Steam, YouTube, KDP, Client Work',
    title: 'Draft platform-ready AI disclosure statements.',
    subtitle:
      'A focused local-first tool for indie game teams, YouTubers, KDP authors, and freelancers who need clear AI-use wording for real publishing contexts.',
    productStatus: 'Steam/Game',
    noAccount: 'YouTube/KDP',
    exportSet: 'Client-ready',
    formTitle: 'Inputs',
    formSubtitle: 'Choose a platform context, AI role, review level, tone, and output language.',
    contentType: 'Content type',
    aiTools: 'AI tools',
    aiUse: 'AI role',
    review: 'Human review',
    tone: 'Tone',
    outputLanguage: 'Output',
    example: 'Load example',
    reset: 'Reset',
    resultTitle: 'Document preview',
    resultSubtitle: 'Disclosure statement, social version, and structured delivery note.',
    primary: 'Statement',
    short: 'Social copy',
    structured: 'Structured note',
    clarity: 'Clarity check',
    copied: 'Copied to clipboard.',
    fallbackCopied: 'Copied with browser fallback.',
    sponsorSold: 'Launch sponsor',
    sponsorSlot: '$10 launch sponsor slot',
    sponsorSlotBody:
      'A compact placement for a relevant creator, compliance, or publishing product.',
    sponsorCta: 'Sponsor this tool',
    visitSponsor: 'Visit sponsor',
    adSlot: 'Reserved placement',
    adBody: 'No ad scripts are loaded in this version.',
    serviceEyebrow: 'Paid micro-service',
    serviceTitle: '$10 custom rewrite',
    serviceBody:
      'Send project type, AI tools, AI role, and review level. Get a polished statement, short version, and structured bullets.',
    serviceCta: 'Request rewrite',
    templatesEyebrow: 'SEO templates',
    templatesTitle: 'Purpose-built AI disclosure examples',
    aboutTitle: 'Built for transparent AI-use statements',
    aboutBody:
      'This tool helps people describe where AI supported a workflow. It does not decide whether a use case is allowed, and it does not replace platform rules, school policies, client contracts, or legal advice.',
    privacyTitle: 'Private by default',
    privacyBody:
      'Inputs stay in the browser. This version has no account system, database, analytics script, payment integration, or AI API call.',
    contactTitle: 'Need a platform-specific template?',
    contactBody: 'Send sponsor requests, template suggestions, or custom rewrite details to',
    qualityTitle: 'Output profile',
    qualityA: 'Disclosure',
    qualityB: 'Social',
    qualityC: 'Client form',
    noRisk: 'No high-risk combination detected for the current inputs.',
    noteSingular: 'note',
    notePlural: 'notes',
    launchEyebrow: 'First $10 launch offer',
    launchTitle: 'Turn this tool into a tiny paid placement.',
    launchBody:
      'Use the launch sponsor slot or custom rewrite offer as the first conversion path while SEO traffic compounds.',
    launchStepA: 'Sponsor slot',
    launchStepABody: '$10 for a compact placement on a focused AI transparency tool.',
    launchStepB: 'Custom rewrite',
    launchStepBBody: '$10 for one polished disclosure statement package.',
    launchStepC: 'Outreach pitch',
    launchStepCBody:
      'Copy a short pitch and send it to tool makers, newsletter authors, or creator communities.',
    copyPitch: 'Copy pitch',
  },
  zh: {
    navTemplates: '模板',
    navSponsor: '赞助',
    navAbout: '关于',
    navPrivacy: '隐私',
    navContact: '联系',
    brandSub: '平台披露文案工作台',
    eyebrow: 'Steam、YouTube、KDP、客户交付',
    title: '生成更贴近平台场景的 AI 使用披露。',
    subtitle:
      '面向独立游戏团队、YouTuber、KDP 作者和自由职业者，用更具体的措辞说明 AI 在真实发布场景中的参与方式。',
    productStatus: 'Steam/游戏',
    noAccount: 'YouTube/KDP',
    exportSet: '客户交付',
    formTitle: '输入参数',
    formSubtitle: '选择平台场景、AI 用途、审核状态、语气和输出语言。',
    contentType: '内容类型',
    aiTools: 'AI 工具',
    aiUse: 'AI 作用',
    review: '人工审核',
    tone: '语气',
    outputLanguage: '输出',
    example: '载入示例',
    reset: '重置',
    resultTitle: '文档预览',
    resultSubtitle: '完整披露、社媒短版和结构化交付说明会实时更新。',
    primary: '披露声明',
    short: '社媒短版',
    structured: '结构化说明',
    clarity: '清晰度检查',
    copied: '已复制到剪贴板。',
    fallbackCopied: '已使用浏览器兼容方式复制。',
    sponsorSold: '启动赞助商',
    sponsorSlot: '$10 启动赞助位',
    sponsorSlotBody: '适合创作者工具、合规工具、发布流程产品的轻量展示位。',
    sponsorCta: '赞助这个工具',
    visitSponsor: '访问赞助商',
    adSlot: '预留展示位',
    adBody: '当前版本不加载广告脚本。',
    serviceEyebrow: '付费小服务',
    serviceTitle: '$10 定制改写',
    serviceBody:
      '发送项目类型、使用的 AI 工具、AI 参与环节和人工审核状态，获得完整披露、短版和结构化说明。',
    serviceCta: '请求改写',
    templatesEyebrow: 'SEO 模板',
    templatesTitle: '常见发布场景的 AI 披露示例',
    aboutTitle: '为透明、诚实的 AI 使用说明而设计',
    aboutBody:
      '这个工具帮助创作者说明 AI 在工作流中的辅助位置。它不判断你的使用是否被允许，也不替代平台规则、学校政策、客户合同或法律建议。',
    privacyTitle: '默认保护隐私',
    privacyBody:
      '输入只停留在浏览器。本版本没有账号、数据库、统计脚本、支付集成或 AI API 调用。',
    contactTitle: '需要某个平台的专用模板？',
    contactBody: '赞助、模板建议或定制文案需求请发送到',
    qualityTitle: '输出结构',
    qualityA: '披露声明',
    qualityB: '社媒文案',
    qualityC: '客户表单',
    noRisk: '当前参数未发现高风险组合。',
    noteSingular: '条提示',
    notePlural: '条提示',
    launchEyebrow: '第一笔 $10 入口',
    launchTitle: '把这个工具变成一个小型付费展示位。',
    launchBody:
      '在 SEO 流量积累之前，先用启动赞助位或定制改写服务拿到第一笔转化。',
    launchStepA: '赞助位',
    launchStepABody: '$10 获得一个面向 AI 透明披露用户的小型展示位。',
    launchStepB: '定制改写',
    launchStepBBody: '$10 提供一套完整披露、短版和结构化说明。',
    launchStepC: '外联话术',
    launchStepCBody: '复制一段简短 pitch，发给工具作者、newsletter 作者或创作者社区。',
    copyPitch: '复制话术',
  },
} satisfies Record<UiLanguage, Record<string, string>>

function toggleMulti<T extends string>(values: T[], value: T) {
  if (values.includes(value)) {
    return values.length === 1 ? values : values.filter((item) => item !== value)
  }

  return [...values, value]
}

function App() {
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>('en')
  const [input, setInput] = useState<DisclosureInput>(defaultInput)
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null)
  const [copyMessage, setCopyMessage] = useState('')
  const t = copy[uiLanguage]
  const output = useMemo(() => generateDisclosure(input), [input])
  const sponsorHref =
    siteConfig.sponsorPaymentUrl || buildMailto('Sponsor AI Disclosure Generator')

  function updateInput<Value extends DisclosureInput[keyof DisclosureInput]>(
    key: keyof DisclosureInput,
    value: Value,
  ) {
    setInput((current) => ({ ...current, [key]: value }))
  }

  async function copyText(target: string, value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopyMessage(t.copied)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = value
      textarea.setAttribute('readonly', '')
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      textarea.remove()
      setCopyMessage(t.fallbackCopied)
    }

    setCopiedTarget(target)
    window.setTimeout(() => {
      setCopiedTarget(null)
      setCopyMessage('')
    }, 1800)
  }

  return (
    <main className={`app-shell ui-${uiLanguage}`}>
      <header className="site-header">
        <a href="#generator" className="brand" aria-label="AI Disclosure Generator home">
          <span className="brand-mark">
            <LayoutDashboard aria-hidden="true" />
          </span>
          <span>
            <strong>AI Disclosure Generator</strong>
            <small>{t.brandSub}</small>
          </span>
        </a>

        <div className="header-actions">
          <a
            className="header-sponsor-link"
            href={sponsorHref}
            target={siteConfig.sponsorPaymentUrl ? '_blank' : undefined}
            rel={siteConfig.sponsorPaymentUrl ? 'noreferrer' : undefined}
          >
            <Coffee aria-hidden="true" />
            {t.navSponsor}
          </a>
          <div className="language-toggle" aria-label="Interface language">
            <button
              type="button"
              className={uiLanguage === 'en' ? 'active' : ''}
              onClick={() => setUiLanguage('en')}
            >
              EN
            </button>
            <button
              type="button"
              className={uiLanguage === 'zh' ? 'active' : ''}
              onClick={() => setUiLanguage('zh')}
            >
              中文
            </button>
          </div>
        </div>
      </header>

      <section className="topline" id="generator">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>
        <div className="status-strip" aria-label="Product status">
          <span>
            <ShieldCheck aria-hidden="true" />
            {t.productStatus}
          </span>
          <span>
            <BadgeCheck aria-hidden="true" />
            {t.noAccount}
          </span>
          <span>
            <Clipboard aria-hidden="true" />
            {t.exportSet}
          </span>
        </div>
      </section>

      <section className="workbench" aria-label="AI disclosure generator">
        <form className="control-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">{t.formTitle}</p>
              <h2>{t.formSubtitle}</h2>
            </div>
            <div className="form-actions">
              <button type="button" className="ghost-button" onClick={() => setInput(defaultInput)}>
                <RefreshCcw aria-hidden="true" />
                {t.reset}
              </button>
              <button type="button" className="primary-button" onClick={() => setInput(exampleInput)}>
                <Wand2 aria-hidden="true" />
                {t.example}
              </button>
            </div>
          </div>

          <div className="field-row">
            <div className="field-label">
              <span>01</span>
              {t.contentType}
            </div>
            <div className="option-grid content-type-grid">
              {contentTypes.map((type) => {
                const Icon = contentTypeIcons[type]
                return (
                  <button
                    className={input.contentType === type ? 'option-tile active' : 'option-tile'}
                    key={type}
                    type="button"
                    onClick={() => updateInput('contentType', type)}
                  >
                    <Icon aria-hidden="true" />
                    <span>
                      {uiLanguage === 'en'
                        ? contentTypeLabels[type].en
                        : contentTypeLabels[type].zh}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <fieldset className="field-row">
            <legend className="field-label">
              <span>02</span>
              {t.aiTools}
            </legend>
            <div className="pill-grid tools-grid">
              {aiTools.map((tool) => (
                <label key={tool} className="choice-pill">
                  <input
                    type="checkbox"
                    checked={input.tools.includes(tool)}
                    onChange={() => updateInput('tools', toggleMulti(input.tools, tool))}
                  />
                  <Blocks aria-hidden="true" />
                  <span>{tool}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="field-row">
            <legend className="field-label">
              <span>03</span>
              {t.aiUse}
            </legend>
            <div className="pill-grid">
              {aiUses.map((use) => {
                const Icon = aiUseIcons[use]
                return (
                  <label key={use} className="choice-pill">
                    <input
                      type="checkbox"
                      checked={input.uses.includes(use)}
                      onChange={() => updateInput('uses', toggleMulti(input.uses, use))}
                    />
                    <Icon aria-hidden="true" />
                    <span>{useLabels[use][uiLanguage]}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>

          <div className="field-row refinement-grid">
            <SegmentedControl
              label={t.review}
              options={reviewLevels}
              value={input.reviewLevel}
              icons={reviewIcons}
              labels={reviewLabels}
              uiLanguage={uiLanguage}
              onChange={(value) => updateInput('reviewLevel', value)}
            />
            <SegmentedControl
              label={t.tone}
              options={tones}
              value={input.tone}
              icons={toneIcons}
              labels={toneLabels}
              uiLanguage={uiLanguage}
              onChange={(value) => updateInput('tone', value)}
            />
            <div className="segmented-field">
              <div className="mini-label">{t.outputLanguage}</div>
              <div className="segmented-control">
                {outputLanguages.map((language) => (
                  <button
                    className={input.language === language ? 'active' : ''}
                    key={language}
                    type="button"
                    onClick={() => updateInput('language', language)}
                  >
                    <Languages aria-hidden="true" />
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>

        <div className="preview-stack">
          <section className="document-panel" aria-label="Generated disclosure output">
            <div className="document-toolbar">
              <span></span>
              <span></span>
              <span></span>
              <strong>{t.resultTitle}</strong>
              <p>{copyMessage}</p>
            </div>

            <div className="document-header">
              <div>
                <p className="eyebrow">{t.resultTitle}</p>
                <h2>{t.resultSubtitle}</h2>
              </div>
              <div className="doc-profile" aria-label={t.qualityTitle}>
                <span>{t.qualityA}</span>
                <span>{t.qualityB}</span>
                <span>{t.qualityC}</span>
              </div>
            </div>

            <article className="output-section primary-output">
              <OutputTitle
                title={t.primary}
                target="primary"
                copiedTarget={copiedTarget}
                onCopy={() => copyText('primary', output.primaryStatement)}
              />
              <p>{output.primaryStatement}</p>
            </article>

            <div className="document-columns">
              <article className="output-section">
                <OutputTitle
                  title={t.short}
                  target="short"
                  copiedTarget={copiedTarget}
                  onCopy={() => copyText('short', output.shortVersion)}
                />
                <p>{output.shortVersion}</p>
              </article>

              <article className="output-section">
                <OutputTitle
                  title={t.structured}
                  target="structured"
                  copiedTarget={copiedTarget}
                  onCopy={() => copyText('structured', output.structuredVersion.join('\n'))}
                />
                <ul>
                  {output.structuredVersion.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
            </article>
          </div>

          {output.riskNotes.length > 0 && (
            <aside className="inline-risk-panel" aria-label="Risk notes">
              <ShieldCheck aria-hidden="true" />
              <div>
                <h3>{t.clarity}</h3>
                <ul>
                  {output.riskNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </aside>
          )}
          </section>
        </div>
      </section>
    </main>
  )
}

type SegmentedControlProps<T extends string> = {
  label: string
  options: T[]
  value: T
  icons: Record<T, LucideIcon>
  labels: Record<T, Record<UiLanguage, string>>
  uiLanguage: UiLanguage
  onChange: (value: T) => void
}

function SegmentedControl<T extends string>({
  label,
  options,
  value,
  icons,
  labels,
  uiLanguage,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="segmented-field">
      <div className="mini-label">{label}</div>
      <div className="segmented-control">
        {options.map((option) => {
          const Icon = icons[option] as LucideIcon
          return (
            <button
              className={value === option ? 'active' : ''}
              key={option}
              type="button"
              onClick={() => onChange(option)}
            >
              <Icon aria-hidden="true" />
              {labels[option][uiLanguage]}
            </button>
          )
        })}
      </div>
    </div>
  )
}

type OutputTitleProps = {
  title: string
  target: string
  copiedTarget: string | null
  onCopy: () => void
}

function OutputTitle({ title, target, copiedTarget, onCopy }: OutputTitleProps) {
  return (
    <div className="output-title">
      <h3>{title}</h3>
      <button type="button" onClick={onCopy} aria-label={`Copy ${title}`}>
        {copiedTarget === target ? (
          <CheckCircle2 aria-hidden="true" />
        ) : (
          <Clipboard aria-hidden="true" />
        )}
      </button>
    </div>
  )
}

export default App

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
  Code2,
  FileCheck2,
  FileText,
  Gamepad2,
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
  education: BookOpen,
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
  'research support': { en: 'Research support', zh: '资料整理' },
  'voice/video generation': { en: 'Voice/video', zh: '音视频生成' },
}

const copy = {
  en: {
    brandSub: 'Platform disclosure workspace',
    eyebrow: 'Steam, YouTube, KDP, Client Work',
    title: 'Know what to say when a platform asks how you used AI.',
    subtitle:
      'Generate copy-ready disclosure text for Steam, YouTube, KDP, and client handoffs. Then edit the wording before you publish.',
    productStatus: 'Platform-specific',
    noAccount: 'No login',
    exportSet: 'Editable output',
    formTitle: 'Inputs',
    formSubtitle: 'Choose a publishing context, AI role, review level, tone, and output language.',
    contentType: 'Publishing context',
    aiTools: 'AI tools',
    aiUse: 'AI role',
    review: 'Human review',
    tone: 'Tone',
    outputLanguage: 'Output',
    example: 'Load example',
    reset: 'Reset',
    resultTitle: 'Editable draft',
    resultSubtitle:
      'Start with a platform-aware draft, revise it in place, and copy the final wording.',
    primary: 'Main disclosure',
    short: 'Short public note',
    structured: 'Platform / client form',
    clarity: 'Disclosure guidance',
    copied: 'Copied to clipboard.',
    fallbackCopied: 'Copied with browser fallback.',
    qualityTitle: 'Output profile',
    qualityA: 'Platform note',
    qualityB: 'Public copy',
    qualityC: 'Form-ready',
    editHint: 'Editable after generation',
  },
  zh: {
    brandSub: '平台披露文案工作台',
    eyebrow: 'Steam、YouTube、KDP、客户交付',
    title: '当平台问你如何使用 AI 时，知道该怎么写。',
    subtitle:
      '为 Steam、YouTube、KDP 和客户交付生成可直接修改的 AI 使用披露文案。生成后可以继续编辑，再复制发布。',
    productStatus: '平台专用',
    noAccount: '无需登录',
    exportSet: '结果可编辑',
    formTitle: '输入参数',
    formSubtitle: '选择发布场景、AI 用途、人工审核状态、语气和输出语言。',
    contentType: '发布场景',
    aiTools: 'AI 工具',
    aiUse: 'AI 用途',
    review: '人工审核',
    tone: '语气',
    outputLanguage: '输出',
    example: '载入示例',
    reset: '重置',
    resultTitle: '可编辑草稿',
    resultSubtitle: '先生成贴近平台场景的草稿，再在右侧直接修改，最后复制使用。',
    primary: '主要披露说明',
    short: '简短公开说明',
    structured: '平台/客户表单',
    clarity: '披露提示',
    copied: '已复制到剪贴板。',
    fallbackCopied: '已使用浏览器兼容方式复制。',
    qualityTitle: '输出结构',
    qualityA: '平台提示',
    qualityB: '公开文案',
    qualityC: '表单可用',
    editHint: '生成后可编辑',
  },
} satisfies Record<UiLanguage, Record<string, string>>

type EditableDraft = {
  signature: string
  primary: string
  short: string
  structured: string
}

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
  const outputSignature = JSON.stringify(input)
  const [editableDraft, setEditableDraft] = useState<EditableDraft>(() =>
    createEditableDraft(outputSignature, output),
  )

  if (editableDraft.signature !== outputSignature) {
    setEditableDraft(createEditableDraft(outputSignature, output))
  }

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
                <p className="eyebrow">{t.editHint}</p>
                <h2>{t.resultSubtitle}</h2>
              </div>
              <div className="doc-profile" aria-label={t.qualityTitle}>
                <span>{t.qualityA}</span>
                <span>{t.qualityB}</span>
                <span>{t.qualityC}</span>
              </div>
            </div>

              <EditableOutput
                className="primary-output"
                title={t.primary}
                target="primary"
                value={editableDraft.primary}
                copiedTarget={copiedTarget}
                minRows={7}
                onChange={(primary) =>
                  setEditableDraft((current) => ({ ...current, primary }))
                }
                onCopy={() => copyText('primary', editableDraft.primary)}
              />

            <div className="document-columns">
              <EditableOutput
                title={t.short}
                target="short"
                value={editableDraft.short}
                copiedTarget={copiedTarget}
                minRows={5}
                onChange={(short) =>
                  setEditableDraft((current) => ({ ...current, short }))
                }
                onCopy={() => copyText('short', editableDraft.short)}
              />

              <EditableOutput
                title={t.structured}
                target="structured"
                value={editableDraft.structured}
                copiedTarget={copiedTarget}
                minRows={8}
                onChange={(structured) =>
                  setEditableDraft((current) => ({ ...current, structured }))
                }
                onCopy={() => copyText('structured', editableDraft.structured)}
              />
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

function createEditableDraft(
  signature: string,
  output: ReturnType<typeof generateDisclosure>,
): EditableDraft {
  return {
    signature,
    primary: output.primaryStatement,
    short: output.shortVersion,
    structured: output.structuredVersion.join('\n'),
  }
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

type EditableOutputProps = {
  className?: string
  title: string
  target: string
  value: string
  copiedTarget: string | null
  minRows: number
  onChange: (value: string) => void
  onCopy: () => void
}

function EditableOutput({
  className = '',
  title,
  target,
  value,
  copiedTarget,
  minRows,
  onChange,
  onCopy,
}: EditableOutputProps) {
  return (
    <article className={`output-section ${className}`}>
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
      <textarea
        value={value}
        rows={minRows}
        spellCheck="true"
        onChange={(event) => onChange(event.target.value)}
      />
    </article>
  )
}

export default App

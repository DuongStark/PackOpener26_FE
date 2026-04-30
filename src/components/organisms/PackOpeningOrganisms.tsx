import { useEffect, useState } from 'react'
import {
  BodyText,
  CaptionText,
  CardFrame,
  CoinDisplay,
  GhostButton,
  LabelText,
  PackIcon,
  PrimaryButton,
  RarityChip,
  SectionTitle,
} from '..'
import './styles/pack-opening.css'

function useReplayKey(intervalMs: number) {
  const [replayKey, setReplayKey] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setReplayKey((value) => value + 1)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs])

  return replayKey
}

export function PackOpeningStage() {
  return (
    <section className="pack-opening-stage">
      <div className="pack-opening-stage-content">
        <CaptionText>PackOpeningStage</CaptionText>
        <SectionTitle as="h2">Elite Pack Intro</SectionTitle>
        <BodyText>Stage layer sets the mood before shake, flash, cues, and card reveal begin.</BodyText>
        <CoinDisplay balance={84200} />
        <div className="pack-opening-visual">
          <PackIcon label="Elite" />
        </div>
      </div>
    </section>
  )
}

export function PackShakeSequence() {
  return (
    <section className="pack-opening-stage">
      <div className="pack-opening-stage-content">
        <CaptionText>PackShakeSequence</CaptionText>
        <SectionTitle as="h2">Pack Shake + Flash Setup</SectionTitle>
        <div className="pack-opening-visual">
          <div className="pack-opening-pack-shake">
            <PackIcon label="Shake" />
          </div>
        </div>
        <BodyText>Amplitude preview follows the dramatic pre-reveal phase before cards drop in.</BodyText>
      </div>
    </section>
  )
}

export function RevealCueSequence() {
  const replayKey = useReplayKey(2600)
  const cues = [
    ['OVR 94', 'Gold+ ceiling'],
    ['ST', 'Position cue'],
    ['🇫🇷', 'Nation flash'],
    ['Special', 'Rarity flare'],
  ] as const

  return (
    <section className="pack-opening-stage">
      <div className="pack-opening-stage-content">
        <CaptionText>RevealCueSequence</CaptionText>
        <SectionTitle as="h2">Progressive Reveal Cues</SectionTitle>
        <div className="pack-opening-cue-sequence" key={replayKey}>
          {cues.map(([value, hint]) => (
            <div className="pack-opening-cue" key={value}>
              <LabelText>{value}</LabelText>
              <BodyText>{hint}</BodyText>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CardRevealRail() {
  const replayKey = useReplayKey(3600)
  const cards = [
    { name: 'KYLIAN MBAPPE', rarity: 'special' as const, overall: 95, nation: '🇫🇷', club: 'RMA' },
    { name: 'LIONEL MESSI', rarity: 'elite' as const, overall: 97, nation: '🇦🇷', club: 'MIA' },
    { name: 'ERLING HAALAND', rarity: 'gold' as const, overall: 94, nation: '🇳🇴', club: 'MCI' },
  ]

  return (
    <section className="pack-opening-stage">
      <div className="pack-opening-stage-content">
        <CaptionText>CardRevealRail</CaptionText>
        <SectionTitle as="h2">Sequential Card Drop</SectionTitle>
        <div className="pack-opening-rail" key={replayKey}>
          {cards.map((card, index) => (
            <div
              className={`pack-opening-rail-card${index === 1 ? ' pack-opening-rail-card-best' : ''}`}
              key={card.name}
            >
              <CardFrame
                rarity={card.rarity}
                overall={card.overall}
                position="ST"
                playerName={card.name}
                nationFlag={card.nation}
                clubCode={card.club}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PackResultSummary() {
  return (
    <section className="pack-opening-result-summary">
      <LabelText>PackResultSummary</LabelText>
      <SectionTitle as="h2">3 Cards Revealed</SectionTitle>
      <BodyText>Best pull: Lionel Messi 97 OVR Elite. Total sell value preview is ready for the next decision.</BodyText>
      <RarityChip rarity="elite">Best Card</RarityChip>
      <div className="pack-opening-result-actions">
        <PrimaryButton>View Cards</PrimaryButton>
        <GhostButton>Sell Later</GhostButton>
        <GhostButton>Open Another Pack</GhostButton>
      </div>
    </section>
  )
}

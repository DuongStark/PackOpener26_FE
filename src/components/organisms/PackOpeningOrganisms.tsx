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
    { name: 'K. MBAPPÉ', rarity: 'DIAMOND_RARE' as const, overall: 91, nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/18.png', club: 'RMA', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/243.png' },
    { name: 'K. KVARATSKHELIA', rarity: 'GOLD_EPIC' as const, overall: 87, nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/20.png', club: 'PSG', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/73.png' },
    { name: 'E. HAALAND', rarity: 'DIAMOND_COMMON' as const, overall: 90, nationImageSrc: 'https://cdn.futbin.com/content/fifa24/img/nation/36.png', club: 'MCI', clubImageSrc: 'https://cdn.futbin.com/content/fifa24/img/clubs/10.png' },
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
                clubCode={card.club}
                nationImageSrc={card.nationImageSrc}
                clubImageSrc={card.clubImageSrc}
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
      <BodyText>Best pull: K. Mbappé 91 OVR Diamond Rare. Total sell value preview is ready for the next decision.</BodyText>
      <RarityChip rarity="DIAMOND_RARE">Best Card</RarityChip>
      <div className="pack-opening-result-actions">
        <PrimaryButton>View Cards</PrimaryButton>
        <GhostButton>Sell Later</GhostButton>
        <GhostButton>Open Another Pack</GhostButton>
      </div>
    </section>
  )
}

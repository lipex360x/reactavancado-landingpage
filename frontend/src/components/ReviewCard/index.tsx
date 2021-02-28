import React, { useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import { ImageProps } from 'types/api'
import { getImageUrl } from 'utils/getImageUrl'

import * as S from './styles'

type Props = {
  id: number
  name: string
  photo: ImageProps
  text: string
}

const ReviewCard: React.FC<Props> = ({ id, name, photo, text }) => {
  console.log(photo)
  useEffect(() => {
    const texts = document.querySelectorAll('p.description')

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        entry.target.classList[
          entry.target.scrollHeight > entry.contentRect.height + 25
            ? 'add'
            : 'remove'
        ]('truncated')
      }
    })

    texts.forEach((text) => observer.observe(text))
  })

  return (
    <S.Card>
      <S.User>
        <S.Image src={getImageUrl(photo.url)} loading="lazy" alt={name} />
        <S.Name>{name}</S.Name>
      </S.User>
      <S.Text>
        <input type="checkbox" id={`review-${id}`} />
        <p className="description">{text}</p>
        <label className="label-more" htmlFor={`review-${id}`}>
          Ver tudo
        </label>
      </S.Text>
    </S.Card>
  )
}

export default ReviewCard

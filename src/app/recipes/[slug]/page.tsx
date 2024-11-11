import React from 'react'
import Container from '@/components/container'
import { getListOfRecipes, getRecipeContent } from '@/helpers/postHelpers'
import ReactMarkdown from 'react-markdown'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export async function generateStaticParams() {
  const posts = getListOfRecipes()
  return posts.map((post) => ({
    slug: post,
  }))
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { content, data } = getRecipeContent((await params).slug)
  return (
    <Container>
      <Row className="pt-5 pb-3">
        <a href="../">&laquo; Back to Recipes</a>
      </Row>
      <Row className="pb-4">
        <h1>{data.title}</h1>
      </Row>
      <Row>
        <Col sm={4} xs={12}>
          <h2 style={{ fontSize: '150%' }}>Ingredients</h2>
          <ul>
            {data.ingredients.map((x: string, i: number) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </Col>
        <Col sm={8} xs={12}>
          <h2 className="d-none d-sm-block" style={{ fontSize: '150%' }}>
            &nbsp;
          </h2>
          <ReactMarkdown>{content}</ReactMarkdown>
        </Col>
      </Row>
    </Container>
  )
}

import React from "react";
import Head from 'next/head'
import Link from "next/link";
import {GetStaticProps} from "next";
import client from "../contentful/index";
import {IArticle, IArticleFields, IHome, IHomeFields} from "../contentful";
import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import {Container, Row, Col, Card, CardTitle, CardText, Button} from 'reactstrap'

type HomePropsType = {
    home: IHome,
    articles: IArticle[]
}

const Home: React.FC<HomePropsType> = ({home, articles}) => {
    return (
        <>
            <Head>
                <title>NextJS App</title>
            </Head>

            <main>
                <div
                    className={"text-center p-5 text-white"}
                    style={{
                        background: `url("http:${home.fields.background?.fields.file.url}") no-repeat center / cover`,
                        minHeight: 300
                    }}
                >
                    <h1 className={"mt-5"}>{home.fields.title}</h1>

                    <div className={"mb-5"}>
                        {documentToReactComponents(home.fields.description!)}
                    </div>
                </div>

                <Container className={"pt-5"}>
                    <Row>
                        {articles.map(article =>
                            <Col sm={4} key={article.fields.slug}>
                                <Card body>
                                    <CardTitle tag={"h5"}>
                                        {article.fields.title}
                                    </CardTitle>
                                    <CardText>
                                        {article.fields.description}
                                    </CardText>
                                    <Link href={`/articles/${article.fields.slug}`}>
                                        <Button>
                                            {article.fields.action}
                                        </Button>
                                    </Link>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
    const home = await client.getEntries<IHomeFields>({
        content_type: 'home',
        limit: 1
    })

    const articleEntries = await client.getEntries<IArticleFields>({
        content_type: 'article',
        select: 'fields.title, fields.slug, fields.description, fields.action'
    })

    const [homePage] = home.items

    return {
        props: {
            home: homePage,
            articles: articleEntries.items
        }
    }
}

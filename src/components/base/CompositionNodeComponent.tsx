import { FragmentType, useFragment } from '../../graphql/fragment-masking'
import { graphql } from '@/graphql'
import ParagraphElementComponent from '../elements/ParagraphElementComponent'
import ArticleElementComponent from '../elements/ArticleElementComponent'

export const CompositionComponentNodeFragment = graphql(/* GraphQL */ `
    fragment compositionComponentNode on CompositionComponentNode {
        key
        component {
            _metadata {
                types
            }
            ...articleElement
            ...paragraphElement
            
        }
    }
`)

const CompositionComponentNodeComponent = (props: {
    compositionComponentNode: FragmentType<typeof CompositionComponentNodeFragment>
}) => {
    const compositionComponentNode = useFragment(CompositionComponentNodeFragment, props.compositionComponentNode)
    const component = compositionComponentNode.component
    switch (component?.__typename) {
        case "ArticleElement":
            return <ArticleElementComponent articleElement={component}/>
        case "ParagraphElement":
            return <ParagraphElementComponent paragraphElement={component}/>
        
        default:
            return <>NotImplementedException</>
    }
}

export default CompositionComponentNodeComponent
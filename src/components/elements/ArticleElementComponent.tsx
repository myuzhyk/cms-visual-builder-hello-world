import { FragmentType, useFragment } from "../../graphql/fragment-masking";
import { graphql } from "@/graphql";
import Moment from "moment";
import DOMPurify from "dompurify";

export const ArticleElementFragment = graphql(
    `
        fragment articleElement on ArticleElement {
            DateCreated
            Image {
                url {
                    default
                }
            }
            Text {
                html
            }
        }
    `
);

const ArticleElementComponent = (props: {
    articleElement: FragmentType<typeof ArticleElementFragment>;
}) => {
    const articleElement = useFragment(
        ArticleElementFragment,
        props.articleElement
    );
    const safeTextHTML = DOMPurify.sanitize(articleElement.Text?.html || "");
    return (
        <div className="px-5 py-2 border bg-white rounded-xl m-3">
            <div className="flex justify-between">
                <div className="text-gray-400">
                    Created:{" "}
                    {Moment(articleElement.DateCreated).format("MMMM DD, YYYY")}
                </div>
                <div className="max-w-[340px]">
                    <img src={articleElement.Image?.url?.default} />
                </div>
            </div>

            <div
                className="h-[200px] overflow-auto"
                dangerouslySetInnerHTML={{ __html: safeTextHTML }}
            ></div>
        </div>
    );
};

export default ArticleElementComponent;

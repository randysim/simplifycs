import renderArticleComponent from "@/lib/renderArticleComponent.js";

export default function ArticleRenderer ({ items }) {
    return (
        <div
            className="prose prose-invert max-w-none w-1/2 prose-h1:text-center"
            style={{ width: "50vw", padding: "20px" }}
        >
            {JSON.parse(items).map((item, i) => (
            <div className="child:m-0" key={i}>
                {renderArticleComponent(item)}
                <br />
            </div>
            ))}
        </div>
    )
}
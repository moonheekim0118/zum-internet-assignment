import { IContents } from "@/types";

interface IProps {
  contentsList: IContents[];
}

function CardList({ contentsList }: IProps): string {
  return `
    <div class="contents-list">
        ${contentsList
          .map(({ idx, imageUrl, title, mediaName, summaryContent }) => {
            return `
            <article class="contents-card" data-index=${idx}>
                <a href="#detail/${idx}">
                    <img src="${imageUrl}"/>
                    <h3>${title}</h3>
                    <span class="summary">
                        ${summaryContent}
                    </span>
                    <span class="author">${mediaName}</span>
                </a>
           </article>
            `;
          })
          .join("")}
    </div>
    `;
}

export default CardList;

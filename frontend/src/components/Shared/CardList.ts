import { IContents, Category } from "@/types";
import { isBookMarked } from "@/storage";
import { StarIcon } from "@/components/Shared";

interface IProps {
  category: Category;
  contentsList: IContents[];
}

function CardList({ category, contentsList }: IProps): string {
  return `
    <div class="contents-list">
        ${contentsList
          .map(({ idx, imageUrl, title, mediaName, summaryContent }) => {
            return `
            <article class="contents-card" data-index=${idx}>
                <a href="#detail/${category}/${idx}">
                    <img src="${imageUrl}"/>
                    <h3>${title}</h3>
                    <span class="summary">
                        ${summaryContent}
                    </span>
                    <div class="lower-container">
                      <span class="author">${mediaName}</span>
                      ${
                        isBookMarked(idx)
                          ? StarIcon({ theme: "primary" })
                          : StarIcon({ theme: "secondary" })
                      }
                    </div>
                </a>
           </article>
            `;
          })
          .join("")}
    </div>
    `;
}

export default CardList;

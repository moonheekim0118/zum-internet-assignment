import { IContents } from "@/types";
import { isBookMarked } from "@/storage";
import { StarIcon } from "@/components/Shared";
import { PATH } from "@/constants";

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
                <a href="${PATH.DETAIL}/${idx}">
                    <img src="${imageUrl}" alt="썸네일 이미지" loading="lazy"/>
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

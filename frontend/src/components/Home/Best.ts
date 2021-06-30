import { Component } from "@/core";
import { newElement } from "@/utils/dom";

const mock = [
  {
    idx: 75514,
    title: "10억년 신비 품은 해변 따라 삼각산 돌아보니 황제의 氣 꿈틀",
    mediaName: "동아일보",
    url: "https://hub.zum.com/donga/75514",
  },
  {
    idx: 75511,
    title: "열기구 올라 낙화암, 수륙양용 버스 타고 백마강… “부여가 달라졌어요”",
    mediaName: "조선일보",
    url: "https://hub.zum.com/chosun/75511",
  },
  {
    idx: 75561,
    title: "'강철부대' 박군, 특전사 부대원으로 출격…\"재입대 상상도 못해\"",
    mediaName: "뉴스1",
    url: "https://hub.zum.com/news1/75561",
  },
  {
    idx: 75459,
    title:
      "[벚꽃 시리즈②: 부산·경남] 조용히 꽃구경하기 좋은 부산·경남 벚꽃 명소 5선",
    mediaName: "문화뉴스",
    url: "https://hub.zum.com/munhwanews/75459",
  },
  {
    idx: 75530,
    title: '이수근 아내 고백 "더 아플까봐 겁나…난 참 소심한 관종"',
    mediaName: "엑스포츠뉴스",
    url: "https://hub.zum.com/xportsnews/75530",
  },
  {
    idx: 74465,
    title: "모두 말렸던 정몽구의 10조 배팅, 벌써 벌어들인 수익만…",
    mediaName: "머니그라운드",
    url: "https://hub.zum.com/mground/74465",
  },
  {
    idx: 75471,
    title: "혼욕이 가능했던 로마의 목욕탕에서 종종 벌어진 일들",
    mediaName: "책식주의",
    url: "https://hub.zum.com/papervore/75471",
  },
  {
    idx: 75462,
    title: "남도엔 이미 아기자기한 봄맛이 방울방울 [지극히 味적인 시장 (51)]",
    mediaName: "경향신문",
    url: "https://hub.zum.com/khan/75462",
  },
  {
    idx: 75247,
    title: "세무조사관도 엄지 들게 만든 연예계 기획사 세무조사 결과",
    mediaName: "스마트인컴",
    url: "https://hub.zum.com/smartincome/75247",
  },
  {
    idx: 75490,
    title: "‘미처 몰랐다’ 부자들이 유독 현관에 화분 두는 현실이유",
    mediaName: "머니그라운드",
    url: "https://hub.zum.com/mground/75490",
  },
  {
    idx: 75588,
    title: "한국 연예인도 따라 입는 레깅스 패션 선두주자들",
    mediaName: "OSEN",
    url: "https://hub.zum.com/osen/75588",
  },
  {
    idx: 75348,
    title: "아이를 가난하게 만드는 부모들의 공통점",
    mediaName: "책썰미",
    url: "https://hub.zum.com/chaegssulmi/75348",
  },
];

class Best extends Component {
  protected initDom(): void {
    this.$container = newElement(`<section class="best-container"/>`);
  }

  protected render(): void {
    this.$container.innerHTML = `
        <h3>실시간 TOP 12</h3>
        <ul>
          ${mock
            .map(({ idx, title, mediaName, url }, rank) => {
              return `
              <li data-index=${idx}>
                <a href="${url}">
                  <span class="${
                    rank < 3 ? "number_rank_top" : "number_rank"
                  }">${rank + 1}</span>
                  <div class="detail">
                    <strong>${title}</strong>
                    <span>${mediaName}</span>
                  </div>
                </a>
              </li>`;
            })
            .join("")}
        </ul>
      `;
  }
}

export default Best;

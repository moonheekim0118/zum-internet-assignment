import { Component } from "@/core";
import { newElement } from "@/utils/dom";
import { CardList } from "@/components/Shared";

const mock = [
  {
    idx: 75478,
    title: "'10년 만의 역주행' 아이유 노래, '롤린'과 차이점은",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/16/d018056bfde640469ea87ca9acdffb91.jpg",
    mediaName: "오마이뉴스",
    url: "https://hub.zum.com/ohmynews/75478",
    summaryContent:
      "소피마르소의 머리 위로 헤드폰이 내려앉은 순간, 사랑은 시작됐습니다. 소녀의 눈앞에 완전히 다른 세상이 펼쳐졌지요. 아등바등 사느라 자주 놓치게 되는 당신의 낭만을 위하여, 잠시 헤드폰을 써보면 어떨까요. 어쩌면 현실보단 노래 속의 꿈들이 진실일지도 모르니까요. Dreams are my reality. 음원차트 역주행은 무명가수뿐 아니라 최정상에 오른 가수",
  },
  {
    idx: 75477,
    title: "한탕 하려던 남자들이 죽었다… 아내들이 대신 나섰다",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/22/15/3977ed43644d4882b7733ee790540819.jpg",
    mediaName: "한국일보",
    url: "https://hub.zum.com/hankookilbo/75477",
    summaryContent:
      "멀쩡하게 ‘출근’한 남편이 죽었다. 혼자가 아니었다. 네 남자가 함께 거액을 강탈하려다 경찰 총격으로 차와 함께 불탔다. 베로니카(비올라 데이비스)는 당황스럽다. 돈 잘 벌어오고 아내 사랑이 지극한 남편 해리(리엄 니슨)가 강도인 줄은 몰랐다. 엘리스(엘리자베스 데비키)도 마찬가지다. 폭력적이지만 달콤하기 그지 없는 남편이 범죄를 행하다 죽을 줄 상상치 못",
  },
  {
    idx: 75376,
    title: "한국인 사진기자 최초로 퓰리처상을 수상한 김경훈의 두 번째 책 ",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/19/10/3e9834456b6743afb17e2d5cd4cfdaab_640x480c.jpg",
    mediaName: "예스24 채널예스",
    url: "https://hub.zum.com/yes24/75376",
    summaryContent:
      "전작인&nbsp;『사진을 읽어 드립니다』가 유명한 사진들을 통해 사진의 역사를 이야기하는 방식이었다면, 이번 책은 사진을 통해 사회적인 이슈들을 끄집어낸다. 한 장의 사진으로부터 흥미로운 때로는 안타까운 이야기가 전개되며, 이를 시작으로 사진에 담긴 의미와 사진 한 장이 어떻게 사회에 영향을 미쳤는지 등 흥미진진한 내용들이 담겨 있다. 약 2년 만에 펴낸 신간입니다",
  },
  {
    idx: 75291,
    title: "7살 딸아이가 아빠 몰래 엄마에게 꺼낸 충격적인 말",
    imageUrl:
      "https://thumb.zumst.com/270x200/https://static.hubzum.zumst.com/hubzum/2021/03/17/16/af1e70e07b154a34baad7d0ac68bba58_640x480c.JPG",
    mediaName: "책썰미",
    url: "https://hub.zum.com/chaegssulmi/75291",
    summaryContent: "",
  },
];

class ContentsList extends Component {
  protected initDom(): void {
    this.$container = newElement(`<section class="contents-container"/>`);
  }

  protected render(): void {
    this.$container.innerHTML = `
      <div class="contents-detail">
        <h4>#컬쳐</h4>
        ${CardList({ contentsList: mock })}
      </div>
    `;
  }
}

export default ContentsList;

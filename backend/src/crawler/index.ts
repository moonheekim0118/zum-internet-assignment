import axios from 'axios';
import cheerio from 'cheerio';

interface IHtml {
    data : string;
}

const crawlContetnsHTML = async(path:string)=>{
    try{
        const html = await axios.get(path) as IHtml;
        const $ = cheerio.load(html.data);
        const $articleContents = $(".article_body div").html()
        return  $articleContents ?? '';
    }catch(error){
        console.error(error);
    }
}

export default crawlContetnsHTML;
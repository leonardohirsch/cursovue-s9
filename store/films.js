import { app } from "../plugins/firebase";
import { db } from "../plugins/firebase";
import { addDoc, collection, doc, deleteDoc,updateDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth  } from "firebase/auth";
import { ref } from 'vue'

const auth = getAuth();

export const state = () => ({
    filmsGenres: [{id:12739,genre:"20th Century Period Pieces"},
    {id:77213,genre:"Absurd Comedies"},
    {id:51063,genre:"Academy Award-Winning Films"},
    {id:1365,genre:"Acción y aventuras"},
    {id:2125,genre:"Acción y aventuras militares"},
    {id:801362,genre:"Action"},
    {id:2653,genre:"Action Anime"},
    {id:43040,genre:"Action Comedies"},
    {id:1568,genre:"Action Sci-Fi & Fantasy"},
    {id:43048,genre:"Action Thrillers"},
    {id:788212,genre:"Actionkrimis"},
    {id:11881,genre:"Adult Animation"},
    {id:7442,genre:"Adventures"},
    {id:3761,genre:"African Films"},
    {id:4906,genre:"African-American Comedies"},
    {id:10778,genre:"African-American Stand-up Comedy"},
    {id:3327,genre:"Alien Sci-Fi"},
    {id:12123,genre:"Ambientadas en otra época"},
    {id:5507,genre:"Animal Tales"},
    {id:786708,genre:"Animated Movies"},
    {id:4698,genre:"Animation"},
    {id:7424,genre:"Anime"},
    {id:1819777,genre:"Anime based on a Video Game"},
    {id:1819776,genre:"Anime based on Books"},
    {id:2316199,genre:"Anime based on Comics"},
    {id:2867325,genre:"Anime Based on Light Novels"},
    {id:9302,genre:"Anime Comedies"},
    {id:452,genre:"Anime Dramas"},
    {id:11146,genre:"Anime Fantasies"},
    {id:3063,genre:"Anime Feature Films"},
    {id:2797624,genre:"Anime for Gamers"},
    {id:10695,genre:"Anime Horror Films"},
    {id:2246382,genre:"Anime released in 2017"},
    {id:2729,genre:"Anime Sci-Fi"},
    {id:1433679,genre:"Anime Sci-Fi & Fantasy"},
    {id:6133,genre:"Argentinian Films"},
    {id:29764,genre:"Art House Films"},
    {id:77232,genre:"Asian Action Films"},
    {id:78104,genre:"Asian Movies"},
    {id:81427741,genre:"Australian"},
    {id:2030,genre:"Australian Comedies"},
    {id:17672,genre:"Australian Documentaries"},
    {id:11075,genre:"Australian Dramas"},
    {id:5230,genre:"Australian Films"},
    {id:10719,genre:"Australian Thrillers"},
    {id:89844,genre:"Award-films"},
    {id:89804,genre:"Award-winning Dramas"},
    {id:8195,genre:"B-Horror Films"},
    {id:2300348,genre:"Baeksang Arts Awards Winners"},
    {id:69946,genre:"BAFTA Award-Winning Films"},
    {id:12339,genre:"Baseball Films"},
    {id:12762,genre:"Basketball Films"},
    {id:81427743,genre:"Belgian"},
    {id:262,genre:"Belgian Films"},
    {id:60594,genre:"Bengali-language Films"},
    {id:846815,genre:"Berlin Film Festival Award-winning Movies"},
    {id:3652,genre:"Biographical Documentaries"},
    {id:3179,genre:"Biographical Dramas"},
    {id:1096,genre:"Biographical Movies"},
    {id:90176,genre:"Blockbuster Action & Adventure"},
    {id:90139,genre:"Blockbuster Movies"},
    {id:90166,genre:"Blockbuster Sci-Fi & Fantasy"},
    {id:2300054,genre:"Blue Dragon Film Award-winning Movies"},
    {id:5480,genre:"Bollywood Films"},
    {id:12443,genre:"Boxing Films"},
    {id:81417793,genre:"Brazilian"},
    {id:17648,genre:"Brazilian Comedies"},
    {id:28269,genre:"Brazilian Documentaries"},
    {id:4425,genre:"Brazilian Dramas"},
    {id:798,genre:"Brazilian Films"},
    {id:84488,genre:"Brazilian Music & Musicals"},
    {id:84489,genre:"Brazilian Music and Concert Movies"},
    {id:10757,genre:"Britische Filme"},
    {id:81399656,genre:"British"},
    {id:1302,genre:"British Action & Adventure"},
    {id:1009,genre:"British Comedies"},
    {id:6051,genre:"British Crime Films"},
    {id:3682,genre:"British Dramas"},
    {id:12433,genre:"British Period Pieces"},
    {id:1774,genre:"British Thrillers"},
    {id:28134,genre:"Buddy Comedies"},
    {id:81427748,genre:"Bulgarian"},
    {id:1252,genre:"Camp Films"},
    {id:81418152,genre:"Canadian"},
    {id:56174,genre:"Canadian Comedies"},
    {id:56178,genre:"Canadian Documentaries"},
    {id:56169,genre:"Canadian Dramas"},
    {id:56181,genre:"Canadian Films"},
    {id:56184,genre:"Canadian Independent Films"},
    {id:846810,genre:"Cannes Film Festival Award-winning Movies"},
    {id:702387,genre:"Cannes Film Festival Winners"},
    {id:783,genre:"Children & Family Films"},
    {id:90848,genre:"Chilling Horror Films"},
    {id:8999,genre:"Chinese Action & Adventure"},
    {id:9229,genre:"Chinese Comedies"},
    {id:5572,genre:"Chinese Dramas"},
    {id:3960,genre:"Chinese Films"},
    {id:46576,genre:"Classic Action & Adventure"},
    {id:46560,genre:"Classic British Films"},
    {id:48586,genre:"Classic Children & Family Films"},
    {id:31694,genre:"Classic Comedies"},
    {id:29809,genre:"Classic Dramas"},
    {id:31574,genre:"Classic Films"},
    {id:48303,genre:"Classic Horror Films"},
    {id:1476390,genre:"Classic International Movies"},
    {id:31853,genre:"Classic Japanese Movies"},
    {id:32392,genre:"Classic Musicals"},
    {id:31273,genre:"Classic Romantic Films"},
    {id:47147,genre:"Classic Sci-Fi & Fantasy"},
    {id:46588,genre:"Classic Thrillers"},
    {id:48744,genre:"Classic War Films"},
    {id:47465,genre:"Classic Westerns"},
    {id:69636,genre:"Colombian Movies"},
    {id:6548,genre:"Comedias"},
    {id:3519,genre:"Comedias adolescentes"},
    {id:9434,genre:"Comedias de culto"},
    {id:4195,genre:"Comedias independientes"},
    {id:5475,genre:"Comedias románticas"},
    {id:1003219,genre:"Comedy Blockbusters"},
    {id:78163,genre:"Comedy Jams"},
    {id:10118,genre:"Comic Book and Superhero Films"},
    {id:81248636,genre:"Concerts"},
    {id:1105,genre:"Country & Western/Folk"},
    {id:2748,genre:"Courtroom Dramas"},
    {id:10714,genre:"Courtroom Films"},
    {id:6895,genre:"Creature Features"},
    {id:9584,genre:"Crime Action & Adventure"},
    {id:4058,genre:"Crime Comedies"},
    {id:9875,genre:"Crime Documentaries"},
    {id:6889,genre:"Crime Dramas"},
    {id:5824,genre:"Crime Films"},
    {id:10185,genre:"Crime Films based on real life"},
    {id:10499,genre:"Crime Thrillers"},
    {id:9736,genre:"Critically Acclaimed Comedies"},
    {id:6206,genre:"Critically Acclaimed Dramas"},
    {id:3979,genre:"Critically Acclaimed Films"},
    {id:899,genre:"Critically-acclaimed Action & Adventure"},
    {id:8673,genre:"Critically-acclaimed Documentaries"},
    {id:875,genre:"Critically-acclaimed Independent Films"},
    {id:5903,genre:"Critically-acclaimed Sci-Fi & Fantasy"},
    {id:7627,genre:"Cult Films"},
    {id:10944,genre:"Cult Horror Films"},
    {id:4734,genre:"Cult Sci-Fi & Fantasy"},
    {id:1964512,genre:"Cyberpunk"},
    {id:1522235,genre:"Cyborg & Robot Anime"},
    {id:81444566,genre:"Czech"},
    {id:1697,genre:"Czech Movies"},
    {id:8451,genre:"Dance"},
    {id:59169,genre:"Danish Comedies"},
    {id:58700,genre:"Danish Films"},
    {id:869,genre:"Dark Comedies"},
    {id:45028,genre:"Deep Sea Horror Films"},
    {id:11177,genre:"Dibujos animados"},
    {id:67673,genre:"Disney"},
    {id:65218,genre:"Disney Family Features"},
    {id:65437,genre:"Disney Films"},
    {id:6839,genre:"Documentaries"},
    {id:2243108,genre:"Documentaries"},
    {id:5763,genre:"Drama"},
    {id:3653,genre:"Dramas basados en la vida real"},
    {id:4961,genre:"Dramas baseados em livros"},
    {id:13158,genre:"Dramas based on classic literature"},
    {id:12994,genre:"Dramas based on contemporary literature"},
    {id:11,genre:"Dramas militares"},
    {id:75459,genre:"Dramas policiais"},
    {id:6616,genre:"Dramas políticos"},
    {id:1255,genre:"Dramas románticos"},
    {id:81422104,genre:"Dutch"},
    {id:89513,genre:"Dutch Children & Family Movies"},
    {id:79871,genre:"Dutch Comedies"},
    {id:9873,genre:"Dutch Dramas"},
    {id:10606,genre:"Dutch Films"},
    {id:5254,genre:"Eastern European Films"},
    {id:10659,genre:"Educación y orientación"},
    {id:81444569,genre:"Egyptian"},
    {id:81237077,genre:"Egyptian Movies"},
    {id:52858,genre:"Epics"},
    {id:89682,genre:"European Comedies"},
    {id:89680,genre:"European Dramas"},
    {id:89708,genre:"European Movies"},
    {id:89692,genre:"European Thrillers"},
    {id:11079,genre:"Experimental Films"},
    {id:26835,genre:"Faith & Spirituality"},
    {id:52804,genre:"Faith & Spirituality Films"},
    {id:52855,genre:"Familieavonturen"},
    {id:52847,genre:"Familiecomedy"},
    {id:58879,genre:"Family Animation"},
    {id:2245805,genre:"Family Cozy Time"},
    {id:31901,genre:"Family Dramas"},
    {id:51058,genre:"Family Feature Animation"},
    {id:51056,genre:"Family Features"},
    {id:52849,genre:"Family Sci-Fi & Fantasy"},
    {id:9744,genre:"Fantasy"},
    {id:77599,genre:"Female Stand-up Comedy"},
    {id:107985,genre:"Festive Favourites"},
    {id:81422106,genre:"Filipino"},
    {id:10869,genre:"Filipino Films"},
    {id:7687,genre:"Film Noir"},
    {id:31851,genre:"Filmes sobre máfia"},
    {id:9889,genre:"Films Based on Books"},
    {id:10056,genre:"Films based on childrens books"},
    {id:920,genre:"Films Based on Real Life"},
    {id:6796,genre:"Films for ages 0 to 2"},
    {id:6962,genre:"Films for ages 11 to 12"},
    {id:6218,genre:"Films for ages 2 to 4"},
    {id:5455,genre:"Films for ages 5 to 7"},
    {id:561,genre:"Films for ages 8 to 10"},
    {id:62285,genre:"Finnish Movies"},
    {id:1515639,genre:"Food & Travel Docs"},
    {id:3890,genre:"Food & Wine"},
    {id:12803,genre:"Football Films"},
    {id:12549,genre:"Football Films"},
    {id:4426,genre:"Foreign Comedies"},
    {id:5161,genre:"Foreign Documentaries"},
    {id:10306,genre:"Foreign Thrillers"},
    {id:58807,genre:"Franse films"},
    {id:81399454,genre:"French"},
    {id:58905,genre:"French Comedies"},
    {id:58710,genre:"French Documentaries"},
    {id:58677,genre:"French Dramas"},
    {id:58798,genre:"French Thrillers"},
    {id:1626246,genre:"Futuristic Sci-Fi"},
    {id:30140,genre:"Gangster Action & Adventure"},
    {id:7120,genre:"Gay & Lesbian Comedies"},
    {id:4720,genre:"Gay & Lesbian Documentaries"},
    {id:500,genre:"Gay & Lesbian Dramas"},
    {id:5977,genre:"Gay & Lesbian Films"},
    {id:81417795,genre:"German"},
    {id:63115,genre:"German Comedies"},
    {id:61695,genre:"German Crime Movies"},
    {id:63286,genre:"German Documentaries"},
    {id:58755,genre:"German Dramas"},
    {id:58886,genre:"German Films"},
    {id:82489,genre:"Golden Globe Award-winning Films"},
    {id:6197,genre:"Goofy Comedies"},
    {id:9509,genre:"Gory Horror Films"},
    {id:27756,genre:"Heist Action & Adventure"},
    {id:27018,genre:"Heist Films"},
    {id:58806,genre:"Hindi-Language Films"},
    {id:6073,genre:"Hip-Hop"},
    {id:2075446,genre:"Historical Anime"},
    {id:5349,genre:"Historical Documentaries"},
    {id:71591,genre:"Historical Dramas"},
    {id:71590,genre:"Historical Films"},
    {id:58676,genre:"Hong Kong Films"},
    {id:89585,genre:"Horror Comedies"},
    {id:8711,genre:"Horror Films"},
    {id:81448926,genre:"Hungarian"},
    {id:59954,genre:"Hungarian Movies"},
    {id:11804,genre:"Independent Action & Adventure"},
    {id:384,genre:"Independent Dramas"},
    {id:7077,genre:"Independent Films"},
    {id:3269,genre:"Independent Thrillers"},
    {id:81418683,genre:"Indian"},
    {id:9942,genre:"Indian Comedies"},
    {id:5051,genre:"Indian Dramas"},
    {id:10463,genre:"Indian Films"},
    {id:81458611,genre:"Indonesian"},
    {id:2867320,genre:"Indonesian Films"},
    {id:78367,genre:"Internationaal"},
    {id:852490,genre:"International Action & Adventure"},
    {id:852492,genre:"International Comedies"},
    {id:852494,genre:"International Documentaries"},
    {id:852493,genre:"International Dramas"},
    {id:1475312,genre:"International Horror Movies"},
    {id:1475315,genre:"International Period Pieces"},
    {id:2070375,genre:"International Reality, Talk & Variety Shows"},
    {id:852491,genre:"International Sci-Fi & Fantasy"},
    {id:852488,genre:"International Thrillers"},
    {id:58750,genre:"Irish Films"},
    {id:11039,genre:"Irreverent Stand-up Comedy"},
    {id:81417798,genre:"Italian"},
    {id:3300,genre:"Italian Comedies"},
    {id:4282,genre:"Italian Dramas"},
    {id:8221,genre:"Italian Films"},
    {id:6867,genre:"Italian Thrillers"},
    {id:81418687,genre:"Japanese"},
    {id:1293326,genre:"Japanese Academy Award-winning Movies"},
    {id:4344,genre:"Japanese Action & Adventure"},
    {id:1747,genre:"Japanese Comedies"},
    {id:1650093,genre:"Japanese Documentary Movies"},
    {id:2893,genre:"Japanese Dramas"},
    {id:10398,genre:"Japanese Films"},
    {id:31244,genre:"Japanese Gangster Movies"},
    {id:10750,genre:"Japanese Horror Films"},
    {id:1519160,genre:"Japanese Movies based on Comics"},
    {id:1402191,genre:"Japanese Period Dramas"},
    {id:6000,genre:"Japanese Sci-Fi & Fantasy"},
    {id:799,genre:"Japanese Thrillers"},
    {id:1652485,genre:"Japanese Youth Dramas"},
    {id:10271,genre:"Jazz & Easy Listening"},
    {id:2638104,genre:"K-dramas"},
    {id:2936382,genre:"K-dramas based on Webtoon"},
    {id:413820,genre:"Kids Anime"},
    {id:751423,genre:"Kids Faith & Spirituality"},
    {id:52843,genre:"Kids Music"},
    {id:81427756,genre:"Korean"},
    {id:8248,genre:"Korean Action & Adventure"},
    {id:6626,genre:"Korean Comedies"},
    {id:1989,genre:"Korean Drama Movies"},
    {id:5685,genre:"Korean Films"},
    {id:2072269,genre:"Korean Reality, Variety & Talk Shows"},
    {id:11283,genre:"Korean Thrillers"},
    {id:1402,genre:"Late Night Comedies"},
    {id:3996,genre:"Latin American Comedies"},
    {id:15456,genre:"Latin American Documentaries"},
    {id:6763,genre:"Latin American Dramas"},
    {id:1613,genre:"Latin American Films"},
    {id:88635,genre:"Latin American Music & Musicals"},
    {id:10741,genre:"Latin Music"},
    {id:1333288,genre:"Laugh-Out-Loud Comedies"},
    {id:2738568,genre:"Lifestyle"},
    {id:74253,genre:"Little Kids"},
    {id:2199520,genre:"Mainland Chinese Movies"},
    {id:59849,genre:"Malayalam-Language Films"},
    {id:81458634,genre:"Malaysian"},
    {id:3057773,genre:"Malaysian Films"},
    {id:2190064,genre:"Marathi-language Films"},
    {id:8985,genre:"Martial Arts Films"},
    {id:6695,genre:"Martial Arts, Boxing & Wrestling"},
    {id:81417800,genre:"Mexican"},
    {id:105,genre:"Mexican Comedies"},
    {id:2757,genre:"Mexican Dramas"},
    {id:7825,genre:"Mexican Films"},
    {id:5875,genre:"Middle Eastern Movies"},
    {id:76501,genre:"Military & War Action & Adventure"},
    {id:76507,genre:"Military & War Dramas"},
    {id:76510,genre:"Military & War Movies"},
    {id:4006,genre:"Military Documentaries"},
    {id:5962,genre:"Military Films"},
    {id:81498,genre:"Mind Game Thrillers"},
    {id:9994,genre:"Mistérios"},
    {id:75415,genre:"Mistérios policiais"},
    {id:26,genre:"Mockumentaries"},
    {id:76186,genre:"Modern Classic Movies"},
    {id:947,genre:"Monster Films"},
    {id:1701,genre:"Music"},
    {id:90361,genre:"Music & Concert Documentaries"},
    {id:52852,genre:"Music & Musicals"},
    {id:84483,genre:"Music and Concert Films"},
    {id:13335,genre:"Musicals"},
    {id:81216565,genre:"Mystery & Thriller Anime"},
    {id:48768,genre:"Nature & Ecology Documentaries"},
    {id:81404209,genre:"Nollywood"},
    {id:1138254,genre:"Nollywood Films"},
    {id:78655,genre:"Nordic Comedies"},
    {id:78628,genre:"Nordic Dramas"},
    {id:78141,genre:"Nordic Movies"},
    {id:61132,genre:"Norwegian Comedies"},
    {id:78463,genre:"Norwegian Crime Movies"},
    {id:62235,genre:"Norwegian Dramas"},
    {id:62510,genre:"Norwegian Films"},
    {id:78507,genre:"Norwegian Thrillers"},
    {id:1827694,genre:"Owarai & Variety Shows"},
    {id:2778638,genre:"Pakistani Films"},
    {id:8883,genre:"Películas románticas"},
    {id:75418,genre:"Police Action & Adventure"},
    {id:79049,genre:"Police Detective Movies"},
    {id:75436,genre:"Police Movies"},
    {id:75390,genre:"Police Thrillers"},
    {id:81422107,genre:"Polish"},
    {id:6102,genre:"Polish Comedies"},
    {id:11729,genre:"Polish Dramas"},
    {id:6299,genre:"Polish Films"},
    {id:6047,genre:"Polish Thrillers"},
    {id:2700,genre:"Political Comedies"},
    {id:7018,genre:"Political Documentaries"},
    {id:10504,genre:"Political Thrillers"},
    {id:77230,genre:"Politically Incorrect Stand-up Comedy"},
    {id:4809,genre:"Psychological Horror Films"},
    {id:5505,genre:"Psychological Thrillers"},
    {id:58982,genre:"Punjabi-language Films"},
    {id:36103,genre:"Quirky Romance"},
    {id:5756,genre:"Raunchy Comedies"},
    {id:2070390,genre:"Reality, Variety & Talk Shows"},
    {id:10005,genre:"Religious Documentaries"},
    {id:1408777,genre:"Retro Anime"},
    {id:3278,genre:"Rock & Pop"},
    {id:4649,genre:"Rockumentaries"},
    {id:1522234,genre:"Romance Anime"},
    {id:502675,genre:"Romances de siempre"},
    {id:81448928,genre:"Romanian"},
    {id:61924,genre:"Romanian Movies"},
    {id:10455,genre:"Romantic British Films"},
    {id:81216629,genre:"Romantic Comedy Anime"},
    {id:61656,genre:"Romantic Danish Movies"},
    {id:62752,genre:"Romantic Dutch Movies"},
    {id:89712,genre:"Romantic European Movies"},
    {id:3830,genre:"Romantic Films based on a book"},
    {id:58900,genre:"Romantic French Films"},
    {id:3329,genre:"Romantic Gay & Lesbian Films"},
    {id:9916,genre:"Romantic Independent Films"},
    {id:1474327,genre:"Romantic International Movies"},
    {id:7908,genre:"Romantic Italian Films"},
    {id:17241,genre:"Romantic Japanese Films"},
    {id:16890,genre:"Romantic Korean Movies"},
    {id:78250,genre:"Romantic Nordic Movies"},
    {id:9257,genre:"Romantic Tearjerkers"},
    {id:1630981,genre:"Romantic Turkish Movies"},
    {id:1655810,genre:"Romantic Youth Drama"},
    {id:11567,genre:"Russian"},
    {id:81427763,genre:"Russian"},
    {id:6998,genre:"Satanic Stories"},
    {id:4922,genre:"Satires"},
    {id:11755,genre:"Scandinavian Comedies"},
    {id:1884,genre:"Scandinavian Crime Films"},
    {id:2696,genre:"Scandinavian Dramas"},
    {id:9292,genre:"Scandinavian Films"},
    {id:69192,genre:"Scandinavian Independent Movies"},
    {id:1321,genre:"Scandinavian Thrillers"},
    {id:1623841,genre:"School Anime"},
    {id:108533,genre:"Sci-Fi"},
    {id:1492,genre:"Sci-Fi & Fantasy"},
    {id:6926,genre:"Sci-Fi Adventure"},
    {id:3916,genre:"Sci-Fi Dramas"},
    {id:3276033,genre:"Sci-Fi Films"},
    {id:1694,genre:"Sci-Fi Horror Films"},
    {id:11014,genre:"Sci-Fi Thrillers"},
    {id:2595,genre:"Science & Nature Docs"},
    {id:49110,genre:"Science & Technology Documentaries"},
    {id:9702,genre:"Screwball Comedies"},
    {id:2913945,genre:"Seinen Anime"},
    {id:3292470,genre:"Shoujo Anime"},
    {id:2867624,genre:"Shounen Anime"},
    {id:25485,genre:"Showbiz Documentaries"},
    {id:5012,genre:"Showbiz Dramas"},
    {id:13573,genre:"Showbiz Musicals"},
    {id:53310,genre:"Silent Films"},
    {id:81422108,genre:"Singaporean"},
    {id:81306797,genre:"Singaporean Movies"},
    {id:3903,genre:"Sitcoms"},
    {id:10256,genre:"Slapstick Comedies"},
    {id:1519826,genre:"Slice of Life Anime"},
    {id:3215,genre:"Soccer Non-fiction"},
    {id:3675,genre:"Social & Cultural Docs"},
    {id:3947,genre:"Social Issue Dramas"},
    {id:1159504,genre:"South African Films"},
    {id:9196,genre:"Southeast Asian Films"},
    {id:81399657,genre:"Spanish"},
    {id:61330,genre:"Spanish Comedies"},
    {id:58796,genre:"Spanish Dramas"},
    {id:58741,genre:"Spanish Films"},
    {id:65558,genre:"Spanish Thrillers"},
    {id:6814,genre:"Special Interest"},
    {id:2760,genre:"Spiritual Documentaries"},
    {id:9327,genre:"Sports & Fitness"},
    {id:1622375,genre:"Sports Anime"},
    {id:5286,genre:"Sports Comedies"},
    {id:180,genre:"Sports Documentaries"},
    {id:7243,genre:"Sports Dramas"},
    {id:4370,genre:"Sports Films"},
    {id:10702,genre:"Spy Action & Adventure"},
    {id:2477,genre:"Spy Movies"},
    {id:9147,genre:"Spy Thrillers"},
    {id:1516534,genre:"Stand-up & Chat Shows"},
    {id:11559,genre:"Stand-up Comedy"},
    {id:794,genre:"Steamy Dramas"},
    {id:29281,genre:"Steamy Romance"},
    {id:35800,genre:"Steamy Romantic Films"},
    {id:972,genre:"Steamy Thrillers"},
    {id:67698,genre:"Superheroes"},
    {id:42023,genre:"Supernatural Horror Films"},
    {id:11140,genre:"Supernatural Thrillers"},
    {id:8933,genre:"Suspenses"},
    {id:81418154,genre:"Swedish"},
    {id:63092,genre:"Swedish Comedies"},
    {id:62140,genre:"Swedish Dramas"},
    {id:62016,genre:"Swedish Films"},
    {id:81417804,genre:"Taiwanese"},
    {id:1461905,genre:"Taiwanese Movies"},
    {id:3030851,genre:"Talk Shows"},
    {id:61904,genre:"Tamil-Language Films"},
    {id:1412508,genre:"Tear-jerking Romantic Movies"},
    {id:6384,genre:"Tearjerkers"},
    {id:9299,genre:"Teen Dramas"},
    {id:2340,genre:"Teen Films"},
    {id:53915,genre:"Teen Romance"},
    {id:52147,genre:"Teen Screams"},
    {id:63676,genre:"Telugu-Language Films"},
    {id:81422109,genre:"Thai"},
    {id:63315,genre:"Thai Action & Adventure"},
    {id:60724,genre:"Thai Comedies"},
    {id:62116,genre:"Thai Dramas"},
    {id:61205,genre:"Thai Films"},
    {id:65209,genre:"Thai Horror Films"},
    {id:10832,genre:"Theater Arts"},
    {id:1663282,genre:"Thriller & Horror Anime"},
    {id:651,genre:"Thrillers based on a book"},
    {id:75448,genre:"Time Travel Sci-Fi & Fantasy"},
    {id:2071073,genre:"Tokusatsu Heroes"},
    {id:1159,genre:"Travel & Adventure Documentaries"},
    {id:81050,genre:"True Crime Documentaries"},
    {id:81417808,genre:"Turkish"},
    {id:1133134,genre:"Turkish Comedies"},
    {id:1133135,genre:"Turkish Dramas"},
    {id:1133133,genre:"Turkish Films"},
    {id:9472,genre:"Urban & Dance"},
    {id:2247011,genre:"Urdu Films"},
    {id:1159493,genre:"US Movies"},
    {id:75804,genre:"Vampire Horror Films"},
    {id:2070675,genre:"Variety Entertainment"},
    {id:61336,genre:"Vietnamese Films"},
    {id:75930,genre:"Werewolf Horror Films"},
    {id:7700,genre:"Westerns"},
    {id:2856,genre:"World Music"},
    {id:70023,genre:"WWII Films"},
    {id:1502288,genre:"Youth Drama"},
    {id:75405,genre:"Zombie Horror Films"}],
    
    firebaseChecked:false,
    filmsFetched: ref([]),
    filmsInList: [],
    filmsBest: [],
    publicReviews: [],
  }
  )
  
  export const getters = {
    getGenres(state) {
      return state.filmsGenres
    },
    filmsInListNum(state) {
      return state.filmsInList.length
    },
    filmsToSee(state) {
      return state.filmsInList.filter((film)=>film.list=="toSee")
    },
    filmsSeen(state) {
      return state.filmsInList.filter((film)=>film.list=="Seen")
    }
  }
  
  export const mutations = {
    updateFetchedFilmsPersonalList(state, {list, genreId, imdb_id}) {
      const indexOfGenre=state.filmsFetched.findIndex(item=>item.genreId==genreId);
      const indexOfMovie=state.filmsFetched[indexOfGenre].films.findIndex(item=>item.imdb_id==imdb_id);
      state.filmsFetched[indexOfGenre].films[indexOfMovie].list=list;
    },
    getFilmsFetched(state, films) {
      state.filmsFetched=[...films]
    },
    loadPersonalList(state, films) {
      state.filmsInList=films;
      state.firebaseChecked=true;
    },
    loadBestList(state, films) {
      state.filmsBest=films;
    },
    addFilmToList(state, film) {
      state.filmsInList.push(film)
      const indexOfGenre=state.filmsFetched.findIndex(item=>item.genreId==film.genreId);
      const indexOfMovie=state.filmsFetched[indexOfGenre].films.findIndex(item=>item.imdb_id==film.imdb_id);
      state.filmsFetched[indexOfGenre].films[indexOfMovie].list=film.list;
    },
    delFilmFromList(state, docId) {
      const movieDeleted=state.filmsInList.find(item=>item.docId==docId);
      const genreOfMovie=movieDeleted.genreId;
      const imdbOfMovie=movieDeleted.imdb_id;
      state.filmsInList=state.filmsInList.filter(film=>film.docId!=docId)
      const indexOfGenre=state.filmsFetched.findIndex(item=>item.genreId==genreOfMovie);
      if (indexOfGenre!=-1){
        const indexOfMovie=state.filmsFetched[indexOfGenre].films.findIndex(item=>item.imdb_id==imdbOfMovie);
        state.filmsFetched[indexOfGenre].films[indexOfMovie].list="";
      }   
    },
    changeList(state, {docId, newList}) {
      const index=state.filmsInList.findIndex(film=>film.docId==docId);
      state.filmsInList[index].list=newList;
      const genreId=state.filmsInList[index].genreId;
      const imdb_id=state.filmsInList[index].imdb_id;
      const indexOfGenre=state.filmsFetched.findIndex(item=>item.genreId==genreId);
      const indexOfMovie=state.filmsFetched[indexOfGenre].films.findIndex(item=>item.imdb_id==imdb_id);
      state.filmsFetched[indexOfGenre].films[indexOfMovie].list=newList;
    },
    scoreFilm(state, {docId, calificacion}) {
      const index=state.filmsInList.findIndex(film=>film.docId==docId);
      state.filmsInList[index].calificacion=calificacion;
    },
    updateComments(state, {docId, list, comments}) {
      const field=list=="toSee" ? "observaciones":"publicReview"
      const index=state.filmsInList.findIndex(film=>film.docId==docId);
      state.filmsInList[index][field]=comments;
    },
    addPublicReview(state, {imdb_id, review}) {
      state.publicReviews.push({imdb_id: imdb_id, review: review})
    },
    resetLists(state){
      state.filmsFetched=newVal;
      state.filmsInList=newVal;
      state.filmsBest=newVal;
      state.publicReviews=newVal;
      firebaseChecked=false;
    },
  }
  
  export const actions = {
    updateFetchedFilmsPersonalList ({commit}, {list, genreId, imdb_id}){
      commit("updateFetchedFilmsPersonalList", {list, genreId, imdb_id});
    },
    async addFilmToList({commit}, {list, movieData}){
      const dbRef = collection(db, "filmsInList");
      if (movieData.poster==undefined){
        movieData.poster='';
      }
      const data= {
        userId: auth.currentUser.uid,
        list: list,
        title:movieData.title,
        imdb_id:movieData.imdb_id,
        synopsis:movieData.synopsis,
        year:movieData.year,
        poster:movieData.poster,
        runtime:movieData.runtime,
        genreId:movieData.genreId,
        genreTitle: movieData.genreTitle,
        observaciones: null,
	      personalReview:null,
        publicReview:null,
        calificacion:null,
      }
      await addDoc(dbRef, data)
      .then(docRef => {
        data.docId=docRef.id;
        const lastDocRef = doc(db, "filmsInList", docRef.id);        
        updateDoc(lastDocRef, {docId: docRef.id});
        commit("addFilmToList", data);
      })
      .catch(error => {
        console.log(error);
      })
    },
    async delFilmFromList({commit}, docId){
      const docRef = doc(db, "filmsInList", docId);
      await deleteDoc(docRef)
      .then(docRef => {
        commit("delFilmFromList", docId);
      })
      .catch(error => {
        console.log(error);
      })
    },
    async changeList({commit}, {docId, list}){
      const docRef = doc(db, "filmsInList", docId);
      const newList=list=="toSee" ? "Seen":"toSee"
      await updateDoc(docRef, {list:newList})
      .then(docRef => {
        commit("changeList", {docId, newList});
      })
      .catch(error => {
        console.log(error);
      })
    },
    async scoreFilm({commit}, {docId, imdb_id, calificacion, alreadyVote, oldVote, genreId, genreTitle,runtime, synopsis, title, year}){
      const getScoreDoc=async ()=>{
        const collectionRef = collection(db, "scoresFilms");
        const q = query(collectionRef, where('imdb_id', "==", imdb_id));
        const getDocuments =await getDocs(q);
        const scoreDoc=[];
        getDocuments.forEach((doc)=>{
          scoreDoc.push({uid: doc.id, ...doc.data() })
        })
        return scoreDoc;
      } 
      const docRef = doc(db, "filmsInList", docId);
      await updateDoc(docRef, {calificacion: calificacion})
      .then(docRef => {
        commit("scoreFilm", {docId, calificacion});
       getScoreDoc()
          .then( res=> {
            if (res.length==0){
              const scoresFilmsRef = collection(db, "scoresFilms");
              const dataScore= {
                imdb_id:imdb_id,
                calificacion_prom:calificacion,
                genreId: genreId,
                genreTitle: genreTitle,
                runtime: runtime,
                synopsis: synopsis,
                title: title,
                year: year,
                votes: 1,
              }
             addDoc(scoresFilmsRef, dataScore)
            } else{
              const scoresFilmDocRef = doc(db, "scoresFilms", res[0].uid);
              let newAverageScore;
              let newNumVotos;
              if (alreadyVote==false){
                newNumVotos=res[0].votes+1;
                newAverageScore=((res[0].calificacion_prom*res[0].votes)+calificacion)/(newNumVotos);
              } else{
                newNumVotos=res[0].votes;
                newAverageScore=(((res[0].calificacion_prom*res[0].votes)-oldVote)+calificacion)/(newNumVotos);
              }
              updateDoc(scoresFilmDocRef, {calificacion_prom: newAverageScore, votes:newNumVotos})
            }
          })
          .catch(error=>console.log(error))
      })
      .catch(error => {
        console.log(error);
      })
    },
    async updateComments({commit}, {docId, list, comments}){
      const docRef = doc(db, "filmsInList", docId);
      const field=list=="toSee" ? "observaciones":"publicReview"
      await updateDoc(docRef, {[field]: comments})
      .then(docRef => {
        commit("updateComments", {docId, list, comments});
      })
      .catch(error => {
        console.log(error);
      })
    },
    addPublicReview({commit}, {imdb_id, review}) {
      commit("addPublicReview", {imdb_id, review});
    },
    loadBestList({commit}, films) {
      commit("loadBestList", films);
    },
  }
export type LaoDistrict = { code: string; en: string; lo: string }
export type LaoProvince = { code: string; iso: string; en: string; lo: string; aliases: string[]; districts: LaoDistrict[] }

// Source: Lao PDR Subnational Administrative Boundaries (COD-AB) v01, https://data.humdata.org/dataset/cod-ab-lao
// Upstream: National Geographic Department (NGD), Lao PDR, via OCHA ROAP and HDX; lao_admin_boundaries.xlsx, sheets lao_admin1 and lao_admin2
// Copied: 2026-11-04
// Licence: CC BY-IGO (see THIRD_PARTY.md)
// Local change: generated into this file; the "ມ." (district) prefix dropped from Lao district names; ISO 3166-2 codes and
// common English spellings (aliases) added from Wikipedia "Provinces of Laos". District counts match the Lao Statistics
// Bureau's table "Number of Districts, Villages and Households by Provinces" (LAOSIS, 2024).

// 17 provinces and Vientiane Capital, by P-code; 148 districts.
export const LAO_PROVINCES: LaoProvince[] = [
  {
    "code": "LA01",
    "iso": "LA-VT",
    "en": "Vientiane Capital",
    "lo": "ນະຄອນຫຼວງວຽງຈັນ",
    "aliases": [
      "Vientiane Prefecture"
    ],
    "districts": [
      {
        "code": "LA0101",
        "en": "Chanthabuly",
        "lo": "ຈັນທະບູລີ"
      },
      {
        "code": "LA0102",
        "en": "Sikhottabong",
        "lo": "ສີໂຄດຕະບອງ"
      },
      {
        "code": "LA0103",
        "en": "Xaysetha",
        "lo": "ໄຊເສດຖາ"
      },
      {
        "code": "LA0104",
        "en": "Sisattanak",
        "lo": "ສີສັດຕະນາກ"
      },
      {
        "code": "LA0105",
        "en": "Naxaithong",
        "lo": "ນາຊາຍທອງ"
      },
      {
        "code": "LA0106",
        "en": "Xaythany",
        "lo": "ໄຊທະນີ"
      },
      {
        "code": "LA0107",
        "en": "Hadxaifong",
        "lo": "ຫາດຊາຍຟອງ"
      },
      {
        "code": "LA0108",
        "en": "Sangthong",
        "lo": "ສັງທອງ"
      },
      {
        "code": "LA0109",
        "en": "Mayparkngum",
        "lo": "ປາກງື່ມ"
      }
    ]
  },
  {
    "code": "LA02",
    "iso": "LA-PH",
    "en": "Phongsaly",
    "lo": "ຜົ້ງສາລີ",
    "aliases": [],
    "districts": [
      {
        "code": "LA0201",
        "en": "Phongsaly",
        "lo": "ຜົ້ງສາລີ"
      },
      {
        "code": "LA0202",
        "en": "May",
        "lo": "ໃໝ່"
      },
      {
        "code": "LA0203",
        "en": "Khua",
        "lo": "ຂວາ"
      },
      {
        "code": "LA0204",
        "en": "Samphanh",
        "lo": "ສຳພັນ"
      },
      {
        "code": "LA0205",
        "en": "Boon Neua",
        "lo": "ບຸນເໜືອ"
      },
      {
        "code": "LA0206",
        "en": "Nhot Ou",
        "lo": "ຍອດອູ"
      },
      {
        "code": "LA0207",
        "en": "Boontay",
        "lo": "ບຸນໃຕ້"
      }
    ]
  },
  {
    "code": "LA03",
    "iso": "LA-LM",
    "en": "Louangnamtha",
    "lo": "ຫຼວງນ້ຳທາ",
    "aliases": [
      "Luang Namtha"
    ],
    "districts": [
      {
        "code": "LA0301",
        "en": "Namtha",
        "lo": "ນ້ຳທາ"
      },
      {
        "code": "LA0302",
        "en": "Sing",
        "lo": "ສິງ"
      },
      {
        "code": "LA0303",
        "en": "Long",
        "lo": "ລອງ"
      },
      {
        "code": "LA0304",
        "en": "Viengphoukha",
        "lo": "ວຽງພູຄາ"
      },
      {
        "code": "LA0305",
        "en": "Nalae",
        "lo": "ນາແລ"
      }
    ]
  },
  {
    "code": "LA04",
    "iso": "LA-OU",
    "en": "Oudomxai",
    "lo": "ອຸດົມໄຊ",
    "aliases": [
      "Oudomxay"
    ],
    "districts": [
      {
        "code": "LA0401",
        "en": "Xay",
        "lo": "ໄຊ"
      },
      {
        "code": "LA0402",
        "en": "La",
        "lo": "ຫຼາ"
      },
      {
        "code": "LA0403",
        "en": "Namor",
        "lo": "ນາໝໍ້"
      },
      {
        "code": "LA0404",
        "en": "Nga",
        "lo": "ງາ"
      },
      {
        "code": "LA0405",
        "en": "Beng",
        "lo": "ແບງ"
      },
      {
        "code": "LA0406",
        "en": "Hoon",
        "lo": "ຮຸນ"
      },
      {
        "code": "LA0407",
        "en": "Pakbeng",
        "lo": "ປາກແບງ"
      }
    ]
  },
  {
    "code": "LA05",
    "iso": "LA-BK",
    "en": "Bokeo",
    "lo": "ບໍ່ແກ້ວ",
    "aliases": [],
    "districts": [
      {
        "code": "LA0501",
        "en": "Huoixai",
        "lo": "ຫ້ວຍຊາຍ"
      },
      {
        "code": "LA0502",
        "en": "Tonpheung",
        "lo": "ຕົ້ນເຜິ້ງ"
      },
      {
        "code": "LA0503",
        "en": "Meung",
        "lo": "ເມິງ"
      },
      {
        "code": "LA0504",
        "en": "Pha Oudom",
        "lo": "ຜາອຸດົມ"
      },
      {
        "code": "LA0505",
        "en": "Paktha",
        "lo": "ປາກທາ"
      }
    ]
  },
  {
    "code": "LA06",
    "iso": "LA-LP",
    "en": "Louangphabang",
    "lo": "ຫຼວງພະບາງ",
    "aliases": [
      "Luang Prabang"
    ],
    "districts": [
      {
        "code": "LA0601",
        "en": "Luangprabang",
        "lo": "ຫຼວງພະບາງ"
      },
      {
        "code": "LA0602",
        "en": "Xieng Ngeun",
        "lo": "ຊຽງເງີນ"
      },
      {
        "code": "LA0603",
        "en": "Nan",
        "lo": "ນານ"
      },
      {
        "code": "LA0604",
        "en": "Park Ou",
        "lo": "ປາກອູ"
      },
      {
        "code": "LA0605",
        "en": "Nambak",
        "lo": "ນ້ຳບາກ"
      },
      {
        "code": "LA0606",
        "en": "Ngoi",
        "lo": "ງອຍ"
      },
      {
        "code": "LA0607",
        "en": "Pak Xeng",
        "lo": "ປາກແຊງ"
      },
      {
        "code": "LA0608",
        "en": "Phonxay",
        "lo": "ໂພນໄຊ"
      },
      {
        "code": "LA0609",
        "en": "Chomphet",
        "lo": "ຈອມເພັດ"
      },
      {
        "code": "LA0610",
        "en": "Viengkham",
        "lo": "ວຽງຄຳ"
      },
      {
        "code": "LA0611",
        "en": "Phoukhoune",
        "lo": "ພູຄູນ"
      },
      {
        "code": "LA0612",
        "en": "Phonthong",
        "lo": "ໂພນທອງ"
      }
    ]
  },
  {
    "code": "LA07",
    "iso": "LA-HO",
    "en": "Houaphan",
    "lo": "ຫົວພັນ",
    "aliases": [
      "Houaphanh"
    ],
    "districts": [
      {
        "code": "LA0701",
        "en": "Xamneua",
        "lo": "ຊຳເໜືອ"
      },
      {
        "code": "LA0702",
        "en": "Xiengkhor",
        "lo": "ຊຽງຄໍ້"
      },
      {
        "code": "LA0703",
        "en": "Hiem",
        "lo": "ຮ້ຽມ"
      },
      {
        "code": "LA0704",
        "en": "Viengxay",
        "lo": "ວຽງໄຊ"
      },
      {
        "code": "LA0705",
        "en": "Huameuang",
        "lo": "ຫົວເມືອງ"
      },
      {
        "code": "LA0706",
        "en": "Xamtay",
        "lo": "ຊຳໃຕ້"
      },
      {
        "code": "LA0707",
        "en": "Sopbao",
        "lo": "ສົບເບົາ"
      },
      {
        "code": "LA0708",
        "en": "Add",
        "lo": "ແອດ"
      },
      {
        "code": "LA0709",
        "en": "Kuan",
        "lo": "ກວັນ"
      },
      {
        "code": "LA0710",
        "en": "Xon",
        "lo": "ຊ່ອນ"
      }
    ]
  },
  {
    "code": "LA08",
    "iso": "LA-XA",
    "en": "Xaignabouly",
    "lo": "ໄຊຍະບູລີ",
    "aliases": [
      "Sainyabuli",
      "Xayaboury"
    ],
    "districts": [
      {
        "code": "LA0801",
        "en": "Xayabury",
        "lo": "ໄຊຍະບູລີ"
      },
      {
        "code": "LA0802",
        "en": "Khop",
        "lo": "ຄອບ"
      },
      {
        "code": "LA0803",
        "en": "Hongsa",
        "lo": "ຫົງສາ"
      },
      {
        "code": "LA0804",
        "en": "Ngeun",
        "lo": "ເງີນ"
      },
      {
        "code": "LA0805",
        "en": "Xienghone",
        "lo": "ຊຽງຮ່ອນ"
      },
      {
        "code": "LA0806",
        "en": "Phiang",
        "lo": "ພຽງ"
      },
      {
        "code": "LA0807",
        "en": "Parklai",
        "lo": "ປາກລາຍ"
      },
      {
        "code": "LA0808",
        "en": "Kenethao",
        "lo": "ແກ່ນທ້າວ"
      },
      {
        "code": "LA0809",
        "en": "Botene",
        "lo": "ບໍ່ແຕນ"
      },
      {
        "code": "LA0810",
        "en": "Thongmyxay",
        "lo": "ທົ່ງມີໄຊ"
      },
      {
        "code": "LA0811",
        "en": "Xaysathan",
        "lo": "ໄຊສະຖານ"
      }
    ]
  },
  {
    "code": "LA09",
    "iso": "LA-XI",
    "en": "Xiengkhouang",
    "lo": "ຊຽງຂວາງ",
    "aliases": [
      "Xiangkhouang"
    ],
    "districts": [
      {
        "code": "LA0901",
        "en": "Pek",
        "lo": "ແປກ"
      },
      {
        "code": "LA0902",
        "en": "Kham",
        "lo": "ຄຳ"
      },
      {
        "code": "LA0903",
        "en": "Nonghed",
        "lo": "ໜອງແຣດ"
      },
      {
        "code": "LA0904",
        "en": "Khoune",
        "lo": "ຄູນ"
      },
      {
        "code": "LA0905",
        "en": "Mork",
        "lo": "ໜອກໄມ"
      },
      {
        "code": "LA0906",
        "en": "Phookood",
        "lo": "ພູກູດ"
      },
      {
        "code": "LA0907",
        "en": "Phaxay",
        "lo": "ຜາໄຊ"
      }
    ]
  },
  {
    "code": "LA10",
    "iso": "LA-VI",
    "en": "Vientiane",
    "lo": "ວຽງຈັນ",
    "aliases": [
      "Vientiane Province"
    ],
    "districts": [
      {
        "code": "LA1001",
        "en": "Phonhong",
        "lo": "ໂພນໂຮງ"
      },
      {
        "code": "LA1002",
        "en": "Thoulakhom",
        "lo": "ທຸລະຄົມ"
      },
      {
        "code": "LA1003",
        "en": "Keo Oudom",
        "lo": "ແກ້ວອຸດົມ"
      },
      {
        "code": "LA1004",
        "en": "Kasy",
        "lo": "ກາສີ"
      },
      {
        "code": "LA1005",
        "en": "Vangvieng",
        "lo": "ວັງວຽງ"
      },
      {
        "code": "LA1006",
        "en": "Feuang",
        "lo": "ເຟືອງ"
      },
      {
        "code": "LA1007",
        "en": "Xanakharm",
        "lo": "ຊະນະຄາມ"
      },
      {
        "code": "LA1008",
        "en": "Mad",
        "lo": "ແມດ"
      },
      {
        "code": "LA1009",
        "en": "Viengkham",
        "lo": "ວຽງຄຳ"
      },
      {
        "code": "LA1010",
        "en": "Hinherb",
        "lo": "ຫີນເຫີບ"
      },
      {
        "code": "LA1013",
        "en": "Meun",
        "lo": "ໜື່ນ"
      }
    ]
  },
  {
    "code": "LA11",
    "iso": "LA-BL",
    "en": "Bolikhamxai",
    "lo": "ບໍລິຄຳໄຊ",
    "aliases": [
      "Bolikhamsai"
    ],
    "districts": [
      {
        "code": "LA1101",
        "en": "Pakxane",
        "lo": "ປາກຊັນ"
      },
      {
        "code": "LA1102",
        "en": "Thaphabath",
        "lo": "ທ່າພະບາດ"
      },
      {
        "code": "LA1103",
        "en": "Pakkading",
        "lo": "ປາກກະດິງ"
      },
      {
        "code": "LA1104",
        "en": "Bolikhanh",
        "lo": "ບໍລິຄັນ"
      },
      {
        "code": "LA1105",
        "en": "Khamkeuth",
        "lo": "ຄຳເກີດ"
      },
      {
        "code": "LA1106",
        "en": "Viengthong",
        "lo": "ວຽງທອງ"
      },
      {
        "code": "LA1107",
        "en": "Xaychamphone",
        "lo": "ໄຊຈຳພອນ"
      }
    ]
  },
  {
    "code": "LA12",
    "iso": "LA-KH",
    "en": "Khammouan",
    "lo": "ຄຳມ່ວນ",
    "aliases": [
      "Khammouane"
    ],
    "districts": [
      {
        "code": "LA1201",
        "en": "Thakhek",
        "lo": "ທ່າແຂກ"
      },
      {
        "code": "LA1202",
        "en": "Mahaxay",
        "lo": "ມະຫາໄຊ"
      },
      {
        "code": "LA1203",
        "en": "Nongbok",
        "lo": "ໝອງບົກ"
      },
      {
        "code": "LA1204",
        "en": "Hinboon",
        "lo": "ຫີນບູນ"
      },
      {
        "code": "LA1205",
        "en": "Nhommalath",
        "lo": "ຍົມມະລາດ"
      },
      {
        "code": "LA1206",
        "en": "Bualapha",
        "lo": "ບົວລະພາ"
      },
      {
        "code": "LA1207",
        "en": "Nakay",
        "lo": "ນາກາຍ"
      },
      {
        "code": "LA1208",
        "en": "Xebangfay",
        "lo": "ເຊບັ້ງໄຟ"
      },
      {
        "code": "LA1209",
        "en": "Xaybuathong",
        "lo": "ໄຊບົວທອງ"
      },
      {
        "code": "LA1210",
        "en": "Khounkham",
        "lo": "ຄຼນຄຳ"
      }
    ]
  },
  {
    "code": "LA13",
    "iso": "LA-SV",
    "en": "Savannakhet",
    "lo": "ສະຫວັນນະເຂດ",
    "aliases": [],
    "districts": [
      {
        "code": "LA1301",
        "en": "Kaysone Phomvihane",
        "lo": "ໄກສອນພົມວິຫານ"
      },
      {
        "code": "LA1302",
        "en": "Outhoomphone",
        "lo": "ອຸທຸມພອນ"
      },
      {
        "code": "LA1303",
        "en": "Atsaphangthong",
        "lo": "ອາດສະພັງທອງ"
      },
      {
        "code": "LA1304",
        "en": "Phine",
        "lo": "ພິນ"
      },
      {
        "code": "LA1305",
        "en": "Sepone",
        "lo": "ເຊໂປນ"
      },
      {
        "code": "LA1306",
        "en": "Nong",
        "lo": "ໜອງ"
      },
      {
        "code": "LA1307",
        "en": "Thapangthong",
        "lo": "ທາພັງທອງ"
      },
      {
        "code": "LA1308",
        "en": "Songkhone",
        "lo": "ສອງຄອນ"
      },
      {
        "code": "LA1309",
        "en": "Champhone",
        "lo": "ຈຳພອນ"
      },
      {
        "code": "LA1310",
        "en": "Xonbuly",
        "lo": "ຊົນບູລີ"
      },
      {
        "code": "LA1311",
        "en": "Xaybuly",
        "lo": "ໄຊບູລີ"
      },
      {
        "code": "LA1312",
        "en": "Vilabuly",
        "lo": "ວິລະບູລີ"
      },
      {
        "code": "LA1313",
        "en": "Atsaphone",
        "lo": "ອາດສະພອນ"
      },
      {
        "code": "LA1314",
        "en": "Xayphoothong",
        "lo": "ໄຊພູທອງ"
      },
      {
        "code": "LA1315",
        "en": "Phalanxay",
        "lo": "ພະລານໄຊ"
      }
    ]
  },
  {
    "code": "LA14",
    "iso": "LA-SL",
    "en": "Salavan",
    "lo": "ສາລະວັນ",
    "aliases": [],
    "districts": [
      {
        "code": "LA1401",
        "en": "Saravane",
        "lo": "ສາລະວັນ"
      },
      {
        "code": "LA1402",
        "en": "Ta Oi",
        "lo": "ຕະໂອ່ຍ"
      },
      {
        "code": "LA1403",
        "en": "Toomlarn",
        "lo": "ຕຸ້ມລານ"
      },
      {
        "code": "LA1404",
        "en": "Lakhonepheng",
        "lo": "ລະຄອນເພງ"
      },
      {
        "code": "LA1405",
        "en": "Vapy",
        "lo": "ວາປີ"
      },
      {
        "code": "LA1406",
        "en": "Khongxedone",
        "lo": "ໂຄງເຊໂດນ"
      },
      {
        "code": "LA1407",
        "en": "Lao Ngarm",
        "lo": "ເລົ່າງາມ"
      },
      {
        "code": "LA1408",
        "en": "Samuoi",
        "lo": "ສະໝ້ວຍ"
      }
    ]
  },
  {
    "code": "LA15",
    "iso": "LA-XE",
    "en": "Sekong",
    "lo": "ເຊກອງ",
    "aliases": [],
    "districts": [
      {
        "code": "LA1501",
        "en": "Lamarm",
        "lo": "ລະມາມ"
      },
      {
        "code": "LA1502",
        "en": "Kaleum",
        "lo": "ກະເລິມ"
      },
      {
        "code": "LA1503",
        "en": "Dakcheung",
        "lo": "ດັກຈຶງ"
      },
      {
        "code": "LA1504",
        "en": "Thateng",
        "lo": "ທ່າແຕງ"
      }
    ]
  },
  {
    "code": "LA16",
    "iso": "LA-CH",
    "en": "Champasack",
    "lo": "ຈຳປາສັກ",
    "aliases": [
      "Champasak"
    ],
    "districts": [
      {
        "code": "LA1601",
        "en": "Pakse",
        "lo": "ປາກເຊ"
      },
      {
        "code": "LA1602",
        "en": "Sanasomboon",
        "lo": "ຊະນະສົມບູນ"
      },
      {
        "code": "LA1603",
        "en": "Bachiangchaleunsook",
        "lo": "ບາຈຽງຈະເລີນສຸກ"
      },
      {
        "code": "LA1604",
        "en": "Paksxong",
        "lo": "ປາກຊ່ອງ"
      },
      {
        "code": "LA1605",
        "en": "Pathoomphone",
        "lo": "ປະທຸມພອນ"
      },
      {
        "code": "LA1606",
        "en": "Phonthong",
        "lo": "ໂພນທອງ"
      },
      {
        "code": "LA1607",
        "en": "Champasack",
        "lo": "ຈຳປາສັກ"
      },
      {
        "code": "LA1608",
        "en": "Sukhuma",
        "lo": "ສຸຂຸມາ"
      },
      {
        "code": "LA1609",
        "en": "Moonlapamok",
        "lo": "ມູນລະປະໂມກ"
      },
      {
        "code": "LA1610",
        "en": "Khong",
        "lo": "ໂຂງ"
      }
    ]
  },
  {
    "code": "LA17",
    "iso": "LA-AT",
    "en": "Attapeu",
    "lo": "ອັດຕະປື",
    "aliases": [],
    "districts": [
      {
        "code": "LA1701",
        "en": "Xaysetha",
        "lo": "ໄຊເສດຖາ"
      },
      {
        "code": "LA1702",
        "en": "Samakkhixay",
        "lo": "ສາມັກຄີໄຊ"
      },
      {
        "code": "LA1703",
        "en": "Sanamxay",
        "lo": "ສະໜາມໄຊ"
      },
      {
        "code": "LA1704",
        "en": "Sanxay",
        "lo": "ຊານໄຊ"
      },
      {
        "code": "LA1705",
        "en": "Phouvong",
        "lo": "ພູວົງ"
      }
    ]
  },
  {
    "code": "LA18",
    "iso": "LA-XS",
    "en": "Xaisomboon",
    "lo": "ໄຊສົມບູນ",
    "aliases": [
      "Xaisomboun"
    ],
    "districts": [
      {
        "code": "LA1801",
        "en": "Anouvong",
        "lo": "ອະນຸວົງ"
      },
      {
        "code": "LA1802",
        "en": "Thathom",
        "lo": "ທາໂທມ"
      },
      {
        "code": "LA1803",
        "en": "Longsane",
        "lo": "ລ້ອງຊານ"
      },
      {
        "code": "LA1804",
        "en": "Home",
        "lo": "ຮົ່ມ"
      },
      {
        "code": "LA1805",
        "en": "Longcheng",
        "lo": "ລ້ອງແຈ້ງ"
      }
    ]
  }
]

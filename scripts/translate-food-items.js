import fs from 'fs';
import path from 'path';

const localesDir = 'src/locales';

// Define translations for all languages
const translations = {
  // Polish
  pl: {
    starch: {
      gluten_grains: "Zboża zawierające gluten (pszenica, jęczmień, żyto np. makaron, chleb, itp.)",
      gluten_free_cereals: "Zboża bezglutenowe (gryka, quinoa, owies)",
      maize_products: "Produkty kukurydziane (np. polenta, przekąski kukurydziane dla niemowląt)",
      potato_sweet_potato: "Ziemniak, Batat",
      rice: "Ryż (włączając mąkę ryżową)",
      rice_pudding: "Pudding ryżowy (zawierający mleko)",
      semolina_pudding: "Pudding z kaszy manny (zawierający mleko)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Kapusta, brokuły, kalafior",
      carrot: "Marchew",
      root_vegetables: "Warzywa korzeniowe takie jak seler",
      leafy_vegetables: "Zielone warzywa liściaste (szpinak, sałata itp.)",
      pea_beans: "Groszek, fasola szparagowa",
      pepper: "Papryka",
      tomato: "Pomidor",
      zucchini: "Cukinia lub inne dyniowate"
    },
    legumes: {
      beans: "Fasola (wszystkie rodzaje)",
      chickpeas: "Ciecierzyca",
      lentils: "Soczewica",
      soya: "Soja",
      peanut: "Orzeszki ziemne/masło orzechowe"
    },
    meat: {
      poultry: "Kurczak/indyk/kaczka",
      processed_meat: "Przetworzone mięso takie jak wędliny/szynka/salami",
      lamb: "Jagnięcina",
      liver_pate: "Pasztet wątrobowy",
      pork: "Wieprzowina",
      rabbit: "Królik",
      beef: "Wołowina",
      venison: "Dziczyzna"
    },
    fish: {
      crustaceans: "Skorupiaki (krewetki, raki, kraby, homary)",
      fish: "Ryby",
      mollusks: "Mięczaki (małże, przegrzebki, ostrygi, muszle, ośmiornica, ślimaki, kałamarnica, mątwa)"
    },
    fruit: {
      apple: "Jabłko (i produkty z jabłek jak mus jabłkowy)",
      mango: "Mango",
      banana: "Banan",
      berries: "Jagody włączając truskawki",
      dried_fruits: "Suszone owoce",
      figs: "Figi",
      fresh_juice: "Świeży sok owocowy",
      fruit_juice: "Sok owocowy (z cukrem lub bez)",
      grapes: "Winogrona",
      kiwi: "Kiwi",
      melon: "Melon, arbuz",
      citrus: "Pomarańcza, mandarynka",
      stone_fruits: "Brzoskwinia, morela",
      pear: "Gruszka"
    },
    dairy: {
      plant_milk: "Mleko roślinne (określ tutaj wzbogacone/niewzbogacone)",
      cow_yogurt: "Jogurt z mleka krowiego",
      cream_cheese: "Serek śmietankowy",
      feta: "Ser feta",
      fresh_cow_milk: "Świeże mleko krowie",
      goat_sheep_milk: "Świeże mleko kozie/owcze",
      kephir: "Kefir",
      kids_yogurt: "Jogurt dla dzieci",
      rice_milk: "Mleko ryżowe",
      goat_sheep_yogurt: "Jogurt owczy/kozi",
      soy_cheese: "Ser sojowy",
      soy_milk: "Mleko sojowe",
      soy_yogurt: "Jogurt sojowy",
      cheese: "Ser (np. cheddar, edam, Comte, parmezan)"
    },
    egg: {
      hard_boiled: "Jajko na twardo (gotowanie >6min)",
      raw: "Surowe jajko",
      partially_cooked: "Częściowo ugotowane jak jajecznica i jajko sadzone"
    },
    fat: {
      butter: "Masło",
      vegetable_oils: "Olej kukurydziany/oleje roślinne",
      margarine: "Margaryna",
      olive_oil: "Oliwa z oliwek",
      nut_seed_oils: "Oleje z orzechów i nasion"
    },
    sweets: {
      baby_biscuits: "Herbatniki dla niemowląt bez cukru",
      fruit_spread: "Pasta owocowa (np. dżem)",
      honey: "Miód",
      sweets_cake: "Słodycze, ciasto, herbatniki"
    },
    nuts: {
      mustard: "Musztarda",
      sesame: "Sezam/tahini",
      tree_nuts: "Orzechy drzewne (i masła orzechowe)"
    },
    spices: {
      salt: "Sól",
      spices_herbs: "Przyprawy/zioła (np. pieprz, cynamon, itp.)"
    },
    additional: {
      baby_food: "Gotowe jedzenie dla niemowląt - słoiczki, saszetki",
      family_meal_salt: "Wspólny posiłek rodzinny z solą",
      family_meal_no_salt: "Wspólny posiłek rodzinny bez soli",
      mashed_food: "Jedzenie rozdrobnione",
      pureed_food: "Jedzenie puree",
      finger_food: "Jedzenie w kawałkach i finger food",
      baby_led_weaning: "Odżywianie kierowane przez dziecko"
    }
  },
  
  // Italian
  it: {
    starch: {
      gluten_grains: "Cereali contenenti glutine (frumento, orzo, segale es. pasta, pane, ecc.)",
      gluten_free_cereals: "Cereali senza glutine (grano saraceno, quinoa, avena)",
      maize_products: "Prodotti a base di mais (es. polenta, snack di mais per bambini)",
      potato_sweet_potato: "Patata, Patata dolce",
      rice: "Riso (inclusa la farina di riso)",
      rice_pudding: "Budino di riso (contenente latte)",
      semolina_pudding: "Budino di semolino (contenente latte)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Cavolo, broccoli, cavolfiore",
      carrot: "Carota",
      root_vegetables: "Verdure a radice come sedano",
      leafy_vegetables: "Verdure a foglia verde (spinaci, lattuga ecc.)",
      pea_beans: "Piselli, fagiolini",
      pepper: "Peperone",
      tomato: "Pomodoro",
      zucchini: "Zucchine o altre zucche"
    },
    legumes: {
      beans: "Fagioli (tutti i tipi)",
      chickpeas: "Ceci",
      lentils: "Lenticchie",
      soya: "Soia",
      peanut: "Arachidi/burro di arachidi"
    },
    meat: {
      poultry: "Pollo/tacchino/anatra",
      processed_meat: "Carni trasformate come salumi/prosciutto/salame",
      lamb: "Agnello",
      liver_pate: "Paté di fegato",
      pork: "Maiale",
      rabbit: "Coniglio",
      beef: "Manzo",
      venison: "Selvaggina"
    },
    fish: {
      crustaceans: "Crostacei (gamberi, gamberi di fiume, granchi, aragoste)",
      fish: "Pesce",
      mollusks: "Molluschi (vongole, capesante, ostriche, cozze, polpo, lumache, calamari, seppie)"
    },
    fruit: {
      apple: "Mela (e prodotti di mela come salsa di mele)",
      mango: "Mango",
      banana: "Banana",
      berries: "Bacche incluse fragole",
      dried_fruits: "Frutta secca",
      figs: "Fichi",
      fresh_juice: "Succo di frutta fresco",
      fruit_juice: "Succo di frutta (con o senza zucchero)",
      grapes: "Uva",
      kiwi: "Kiwi",
      melon: "Melone, anguria",
      citrus: "Arancia, mandarino",
      stone_fruits: "Pesca, albicocca",
      pear: "Pera"
    },
    dairy: {
      plant_milk: "Latte vegetale (specificare qui fortificato/non fortificato)",
      cow_yogurt: "Yogurt di latte vaccino",
      cream_cheese: "Formaggio cremoso",
      feta: "Formaggio feta",
      fresh_cow_milk: "Latte vaccino fresco",
      goat_sheep_milk: "Latte fresco di capra/pecora",
      kephir: "Kefir",
      kids_yogurt: "Yogurt per bambini",
      rice_milk: "Latte di riso",
      goat_sheep_yogurt: "Yogurt di pecora/capra",
      soy_cheese: "Formaggio di soia",
      soy_milk: "Latte di soia",
      soy_yogurt: "Yogurt di soia",
      cheese: "Formaggio (es. cheddar, edam, Comte, parmigiano)"
    },
    egg: {
      hard_boiled: "Uovo sodo (bollitura >6min)",
      raw: "Uovo crudo",
      partially_cooked: "Parzialmente cotto come uova strapazzate e uovo all'occhio di bue"
    },
    fat: {
      butter: "Burro",
      vegetable_oils: "Olio di mais/oli vegetali",
      margarine: "Margarina",
      olive_oil: "Olio d'oliva",
      nut_seed_oils: "Oli di noci e semi"
    },
    sweets: {
      baby_biscuits: "Biscotti per bambini senza zucchero",
      fruit_spread: "Spalmabile di frutta (es. marmellata)",
      honey: "Miele",
      sweets_cake: "Dolci, torta, biscotti"
    },
    nuts: {
      mustard: "Senape",
      sesame: "Sesamo/tahini",
      tree_nuts: "Frutta secca (e burri di frutta secca)"
    },
    spices: {
      salt: "Sale",
      spices_herbs: "Spezie/erbe (es. pepe, cannella, ecc.)"
    },
    additional: {
      baby_food: "Alimenti per bambini preparati - vasetti, buste",
      family_meal_salt: "Condividi pasto familiare con sale",
      family_meal_no_salt: "Condividi pasto familiare senza sale",
      mashed_food: "Cibo schiacciato",
      pureed_food: "Cibo frullato",
      finger_food: "Cibo a pezzi e finger food",
      baby_led_weaning: "Svezzamento guidato dal bambino"
    }
  },
  
  // Spanish
  es: {
    starch: {
      gluten_grains: "Cereales que contienen gluten (trigo, cebada, centeno ej. pasta, pan, etc.)",
      gluten_free_cereals: "Cereales sin gluten (trigo sarraceno, quinoa, avena)",
      maize_products: "Productos de maíz (ej. polenta, aperitivos de maíz para bebés)",
      potato_sweet_potato: "Patata, Batata",
      rice: "Arroz (incluyendo harina de arroz)",
      rice_pudding: "Pudín de arroz (que contiene leche)",
      semolina_pudding: "Pudín de sémola (que contiene leche)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Repollo, brócoli, coliflor",
      carrot: "Zanahoria",
      root_vegetables: "Verduras de raíz como apio",
      leafy_vegetables: "Verduras de hoja verde (espinaca, lechuga, etc.)",
      pea_beans: "Guisantes, judías verdes",
      pepper: "Pimiento",
      tomato: "Tomate",
      zucchini: "Calabacín u otras calabazas"
    },
    legumes: {
      beans: "Frijoles (todos los tipos)",
      chickpeas: "Garbanzos",
      lentils: "Lentejas",
      soya: "Soja",
      peanut: "Cacahuetes/mantequilla de cacahuete"
    },
    meat: {
      poultry: "Pollo/pavo/pato",
      processed_meat: "Carne procesada como embutidos/jamón/salami",
      lamb: "Cordero",
      liver_pate: "Paté de hígado",
      pork: "Cerdo",
      rabbit: "Conejo",
      beef: "Ternera",
      venison: "Venado"
    },
    fish: {
      crustaceans: "Crustáceos (camarones, cangrejos de río, cangrejos, langostas)",
      fish: "Pescado",
      mollusks: "Moluscos (almejas, vieiras, ostras, mejillones, pulpo, caracoles, calamares, sepia)"
    },
    fruit: {
      apple: "Manzana (y productos de manzana como salsa de manzana)",
      mango: "Mango",
      banana: "Plátano",
      berries: "Bayas incluyendo fresas",
      dried_fruits: "Frutas secas",
      figs: "Higos",
      fresh_juice: "Zumo de fruta fresco",
      fruit_juice: "Zumo de fruta (con o sin azúcar)",
      grapes: "Uvas",
      kiwi: "Kiwi",
      melon: "Melón, sandía",
      citrus: "Naranja, mandarina",
      stone_fruits: "Melocotón, albaricoque",
      pear: "Pera"
    },
    dairy: {
      plant_milk: "Leche vegetal (especificar aquí fortificada/no fortificada)",
      cow_yogurt: "Yogur de leche de vaca",
      cream_cheese: "Queso crema",
      feta: "Queso feta",
      fresh_cow_milk: "Leche de vaca fresca",
      goat_sheep_milk: "Leche fresca de cabra/oveja",
      kephir: "Kéfir",
      kids_yogurt: "Yogur para niños",
      rice_milk: "Leche de arroz",
      goat_sheep_yogurt: "Yogur de oveja/cabra",
      soy_cheese: "Queso de soja",
      soy_milk: "Leche de soja",
      soy_yogurt: "Yogur de soja",
      cheese: "Queso (ej. cheddar, edam, Comte, parmesano)"
    },
    egg: {
      hard_boiled: "Huevo cocido duro (hervir >6min)",
      raw: "Huevo crudo",
      partially_cooked: "Parcialmente cocido como huevos revueltos y huevo frito"
    },
    fat: {
      butter: "Mantequilla",
      vegetable_oils: "Aceite de maíz/aceites vegetales",
      margarine: "Margarina",
      olive_oil: "Aceite de oliva",
      nut_seed_oils: "Aceites de nueces y semillas"
    },
    sweets: {
      baby_biscuits: "Galletas para bebés sin azúcar",
      fruit_spread: "Mermelada de frutas",
      honey: "Miel",
      sweets_cake: "Dulces, pastel, galletas"
    },
    nuts: {
      mustard: "Mostaza",
      sesame: "Sésamo/tahini",
      tree_nuts: "Frutos secos (y mantequillas de frutos secos)"
    },
    spices: {
      salt: "Sal",
      spices_herbs: "Especias/hierbas (ej. pimienta, canela, etc.)"
    },
    additional: {
      baby_food: "Comida para bebés preparada - tarros, bolsas",
      family_meal_salt: "Compartir comida familiar con sal",
      family_meal_no_salt: "Compartir comida familiar sin sal",
      mashed_food: "Comida triturada",
      pureed_food: "Comida en puré",
      finger_food: "Comida en trozos y finger food",
      baby_led_weaning: "Destete dirigido por el bebé"
    }
  },
  
  // German
  de: {
    starch: {
      gluten_grains: "Glutenhaltige Getreide (Weizen, Gerste, Roggen z.B. Nudeln, Brot, usw.)",
      gluten_free_cereals: "Glutenfreie Getreide (Buchweizen, Quinoa, Hafer)",
      maize_products: "Maisprodukte (z.B. Polenta, Mais-Snacks für Babys)",
      potato_sweet_potato: "Kartoffel, Süßkartoffel",
      rice: "Reis (einschließlich Reismehl)",
      rice_pudding: "Reispudding (mit Milch)",
      semolina_pudding: "Grießpudding (mit Milch)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Kohl, Brokkoli, Blumenkohl",
      carrot: "Karotte",
      root_vegetables: "Wurzelgemüse wie Sellerie",
      leafy_vegetables: "Grünes Blattgemüse (Spinat, Salat usw.)",
      pea_beans: "Erbsen, grüne Bohnen",
      pepper: "Paprika",
      tomato: "Tomate",
      zucchini: "Zucchini oder andere Kürbisse"
    },
    legumes: {
      beans: "Bohnen (alle Arten)",
      chickpeas: "Kichererbsen",
      lentils: "Linsen",
      soya: "Soja",
      peanut: "Erdnüsse/Erdnussbutter"
    },
    meat: {
      poultry: "Huhn/Truthahn/Ente",
      processed_meat: "Verarbeitetes Fleisch wie Aufschnitt/Schinken/Salami",
      lamb: "Lamm",
      liver_pate: "Leberpastete",
      pork: "Schweinefleisch",
      rabbit: "Kaninchen",
      beef: "Rindfleisch",
      venison: "Wild"
    },
    fish: {
      crustaceans: "Krustentiere (Garnelen, Flusskrebse, Krabben, Hummer)",
      fish: "Fisch",
      mollusks: "Weichtiere (Muscheln, Jakobsmuscheln, Austern, Miesmuscheln, Tintenfisch, Schnecken, Kalmare, Sepia)"
    },
    fruit: {
      apple: "Apfel (und Apfelprodukte wie Apfelsauce)",
      mango: "Mango",
      banana: "Banane",
      berries: "Beeren einschließlich Erdbeeren",
      dried_fruits: "Trockenfrüchte",
      figs: "Feigen",
      fresh_juice: "Frischer Fruchtsaft",
      fruit_juice: "Fruchtsaft (mit oder ohne Zucker)",
      grapes: "Trauben",
      kiwi: "Kiwi",
      melon: "Melone, Wassermelone",
      citrus: "Orange, Mandarine",
      stone_fruits: "Pfirsich, Aprikose",
      pear: "Birne"
    },
    dairy: {
      plant_milk: "Pflanzenmilch (hier angereichert/nicht angereichert angeben)",
      cow_yogurt: "Kuhmilch-Joghurt",
      cream_cheese: "Frischkäse",
      feta: "Feta-Käse",
      fresh_cow_milk: "Frische Kuhmilch",
      goat_sheep_milk: "Frische Ziegen-/Schafsmilch",
      kephir: "Kefir",
      kids_yogurt: "Kinderjoghurt",
      rice_milk: "Reismilch",
      goat_sheep_yogurt: "Schafs-/Ziegenjoghurt",
      soy_cheese: "Soja-Käse",
      soy_milk: "Sojamilch",
      soy_yogurt: "Soja-Joghurt",
      cheese: "Käse (z.B. Cheddar, Edam, Comte, Parmesan)"
    },
    egg: {
      hard_boiled: "Hartgekochtes Ei (Kochen >6min)",
      raw: "Rohes Ei",
      partially_cooked: "Teilweise gekocht wie Rührei und Spiegelei"
    },
    fat: {
      butter: "Butter",
      vegetable_oils: "Maisöl/Pflanzenöle",
      margarine: "Margarine",
      olive_oil: "Olivenöl",
      nut_seed_oils: "Nuss- und Samenöle"
    },
    sweets: {
      baby_biscuits: "Baby-Kekse ohne Zucker",
      fruit_spread: "Fruchtaufstrich (z.B. Marmelade)",
      honey: "Honig",
      sweets_cake: "Süßigkeiten, Kuchen, Kekse"
    },
    nuts: {
      mustard: "Senf",
      sesame: "Sesam/Tahini",
      tree_nuts: "Baumnüsse (und Nussbutter)"
    },
    spices: {
      salt: "Salz",
      spices_herbs: "Gewürze/Kräuter (z.B. Pfeffer, Zimt, usw.)"
    },
    additional: {
      baby_food: "Fertige Babynahrung - Gläschen, Beutel",
      family_meal_salt: "Familienmahlzeit mit Salz teilen",
      family_meal_no_salt: "Familienmahlzeit ohne Salz teilen",
      mashed_food: "Püriertef Nahrung",
      pureed_food: "Püreeform",
      finger_food: "Fingerfood",
      baby_led_weaning: "Babygeleitete Beikost"
    }
  },
  
  // Portuguese
  pt: {
    starch: {
      gluten_grains: "Cereais contendo glúten (trigo, cevada, centeio ex. massa, pão, etc.)",
      gluten_free_cereals: "Cereais sem glúten (trigo sarraceno, quinoa, aveia)",
      maize_products: "Produtos de milho (ex. polenta, lanches de milho para bebês)",
      potato_sweet_potato: "Batata, Batata-doce",
      rice: "Arroz (incluindo farinha de arroz)",
      rice_pudding: "Pudim de arroz (contendo leite)",
      semolina_pudding: "Pudim de sêmola (contendo leite)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Repolho, brócolis, couve-flor",
      carrot: "Cenoura",
      root_vegetables: "Vegetais de raiz como aipo",
      leafy_vegetables: "Vegetais de folha verde (espinafre, alface, etc.)",
      pea_beans: "Ervilha, vagem",
      pepper: "Pimentão",
      tomato: "Tomate",
      zucchini: "Abobrinha ou outras abóboras"
    },
    legumes: {
      beans: "Feijão (todos os tipos)",
      chickpeas: "Grão-de-bico",
      lentils: "Lentilhas",
      soya: "Soja",
      peanut: "Amendoim/manteiga de amendoim"
    },
    meat: {
      poultry: "Frango/peru/pato",
      processed_meat: "Carne processada como frios/presunto/salame",
      lamb: "Cordeiro",
      liver_pate: "Patê de fígado",
      pork: "Porco",
      rabbit: "Coelho",
      beef: "Carne bovina",
      venison: "Carne de veado"
    },
    fish: {
      crustaceans: "Crustáceos (camarões, lagostins, caranguejos, lagostas)",
      fish: "Peixe",
      mollusks: "Moluscos (amêijoas, vieiras, ostras, mexilhões, polvo, caracóis, lulas, chocos)"
    },
    fruit: {
      apple: "Maçã (e produtos de maçã como molho de maçã)",
      mango: "Manga",
      banana: "Banana",
      berries: "Bagas incluindo morango",
      dried_fruits: "Frutas secas",
      figs: "Figos",
      fresh_juice: "Suco de fruta fresco",
      fruit_juice: "Suco de fruta (com ou sem açúcar)",
      grapes: "Uvas",
      kiwi: "Kiwi",
      melon: "Melão, melancia",
      citrus: "Laranja, tangerina",
      stone_fruits: "Pêssego, damasco",
      pear: "Pêra"
    },
    dairy: {
      plant_milk: "Leite vegetal (especificar aqui fortificado/não fortificado)",
      cow_yogurt: "Iogurte de leite de vaca",
      cream_cheese: "Queijo cremoso",
      feta: "Queijo feta",
      fresh_cow_milk: "Leite de vaca fresco",
      goat_sheep_milk: "Leite fresco de cabra/ovelha",
      kephir: "Kefir",
      kids_yogurt: "Iogurte para crianças",
      rice_milk: "Leite de arroz",
      goat_sheep_yogurt: "Iogurte de ovelha/cabra",
      soy_cheese: "Queijo de soja",
      soy_milk: "Leite de soja",
      soy_yogurt: "Iogurte de soja",
      cheese: "Queijo (ex. cheddar, edam, Comte, parmesão)"
    },
    egg: {
      hard_boiled: "Ovo cozido duro (ferver >6min)",
      raw: "Ovo cru",
      partially_cooked: "Parcialmente cozido como ovos mexidos e ovo frito"
    },
    fat: {
      butter: "Manteiga",
      vegetable_oils: "Óleo de milho/óleos vegetais",
      margarine: "Margarina",
      olive_oil: "Azeite de oliva",
      nut_seed_oils: "Óleos de nozes e sementes"
    },
    sweets: {
      baby_biscuits: "Biscoitos para bebês sem açúcar",
      fruit_spread: "Pasta de fruta (ex. geleia)",
      honey: "Mel",
      sweets_cake: "Doces, bolo, biscoitos"
    },
    nuts: {
      mustard: "Mostarda",
      sesame: "Gergelim/tahini",
      tree_nuts: "Nozes (e manteigas de nozes)"
    },
    spices: {
      salt: "Sal",
      spices_herbs: "Temperos/ervas (ex. pimenta, canela, etc.)"
    },
    additional: {
      baby_food: "Comida para bebês preparada - potinhos, sachês",
      family_meal_salt: "Compartilhar refeição familiar com sal",
      family_meal_no_salt: "Compartilhar refeição familiar sem sal",
      mashed_food: "Comida amassada",
      pureed_food: "Comida em purê",
      finger_food: "Comida em pedaços e finger food",
      baby_led_weaning: "Desmame liderado pelo bebê"
    }
  },
  
  // Dutch
  nl: {
    starch: {
      gluten_grains: "Glutenhoudende granen (tarwe, gerst, rogge bijv. pasta, brood, enz.)",
      gluten_free_cereals: "Glutenvrije granen (boekweit, quinoa, haver)",
      maize_products: "Maïsproducten (bijv. polenta, maïs snacks voor baby's)",
      potato_sweet_potato: "Aardappel, Zoete aardappel",
      rice: "Rijst (inclusief rijstmeel)",
      rice_pudding: "Rijstpudding (met melk)",
      semolina_pudding: "Griesmeel pudding (met melk)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Kool, broccoli, bloemkool",
      carrot: "Wortel",
      root_vegetables: "Wortelgroenten zoals selderij",
      leafy_vegetables: "Groene bladgroenten (spinazie, sla enz.)",
      pea_beans: "Erwten, sperziebonen",
      pepper: "Paprika",
      tomato: "Tomaat",
      zucchini: "Courgette of andere pompoenen"
    },
    legumes: {
      beans: "Bonen (alle soorten)",
      chickpeas: "Kikkererwten",
      lentils: "Linzen",
      soya: "Soja",
      peanut: "Pinda's/pindakaas"
    },
    meat: {
      poultry: "Kip/kalkoen/eend",
      processed_meat: "Verwerkt vlees zoals vleeswaren/ham/salami",
      lamb: "Lam",
      liver_pate: "Leverpaté",
      pork: "Varkensvlees",
      rabbit: "Konijn",
      beef: "Rundvlees",
      venison: "Wild"
    },
    fish: {
      crustaceans: "Schaaldieren (garnalen, rivierkreeften, krabben, kreeften)",
      fish: "Vis",
      mollusks: "Weekdieren (mosselen, coquilles, oesters, mossels, octopus, slakken, inktvis, pijlinktvis)"
    },
    fruit: {
      apple: "Appel (en appelproducten zoals appelmoes)",
      mango: "Mango",
      banana: "Banaan",
      berries: "Bessen inclusief aardbeien",
      dried_fruits: "Gedroogde vruchten",
      figs: "Vijgen",
      fresh_juice: "Verse vruchtensap",
      fruit_juice: "Vruchtensap (met of zonder suiker)",
      grapes: "Druiven",
      kiwi: "Kiwi",
      melon: "Meloen, watermeloen",
      citrus: "Sinaasappel, mandarijn",
      stone_fruits: "Perzik, abrikoos",
      pear: "Peer"
    },
    dairy: {
      plant_milk: "Plantaardige melk (specificeer hier verrijkt/niet verrijkt)",
      cow_yogurt: "Koemelk yoghurt",
      cream_cheese: "Roomkaas",
      feta: "Feta kaas",
      fresh_cow_milk: "Verse koemelk",
      goat_sheep_milk: "Verse geiten/schapenmelk",
      kephir: "Kefir",
      kids_yogurt: "Kinderyoghurt",
      rice_milk: "Rijstmelk",
      goat_sheep_yogurt: "Schapen/geiten yoghurt",
      soy_cheese: "Soja kaas",
      soy_milk: "Sojamelk",
      soy_yogurt: "Soja yoghurt",
      cheese: "Kaas (bijv. cheddar, edam, Comte, parmezaan)"
    },
    egg: {
      hard_boiled: "Hardgekookt ei (koken >6min)",
      raw: "Rauw ei",
      partially_cooked: "Gedeeltelijk gekookt zoals roerei en spiegelei"
    },
    fat: {
      butter: "Boter",
      vegetable_oils: "Maisolie/plantaardige oliën",
      margarine: "Margarine",
      olive_oil: "Olijfolie",
      nut_seed_oils: "Noten- en zadolie"
    },
    sweets: {
      baby_biscuits: "Baby koekjes zonder suiker",
      fruit_spread: "Fruitbeleg (bijv. jam)",
      honey: "Honing",
      sweets_cake: "Snoep, taart, koekjes"
    },
    nuts: {
      mustard: "Mosterd",
      sesame: "Sesam/tahini",
      tree_nuts: "Boomnotne (en notenpasta's)"
    },
    spices: {
      salt: "Zout",
      spices_herbs: "Kruiden/specerijen (bijv. peper, kaneel, enz.)"
    },
    additional: {
      baby_food: "Kant-en-klare babyvoeding - potjes, zakjes",
      family_meal_salt: "Familiemaaltijd delen met zout",
      family_meal_no_salt: "Familiemaaltijd delen zonder zout",
      mashed_food: "Geplet voedsel",
      pureed_food: "Gepureerd voedsel",
      finger_food: "Voedsel in stukjes en fingerfood",
      baby_led_weaning: "Baby-geleide spening"
    }
  },
  
  // French
  fr: {
    starch: {
      gluten_grains: "Céréales contenant du gluten (blé, orge, seigle ex. pâtes, pain, etc.)",
      gluten_free_cereals: "Céréales sans gluten (sarrasin, quinoa, avoine)",
      maize_products: "Produits à base de maïs (ex. polenta, collations de maïs pour bébés)",
      potato_sweet_potato: "Pomme de terre, Patate douce",
      rice: "Riz (y compris farine de riz)",
      rice_pudding: "Pudding de riz (contenant du lait)",
      semolina_pudding: "Pudding de semoule (contenant du lait)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Chou, brocoli, chou-fleur",
      carrot: "Carotte",
      root_vegetables: "Légumes racines comme céleri",
      leafy_vegetables: "Légumes verts à feuilles (épinard, laitue, etc.)",
      pea_beans: "Petits pois, haricots verts",
      pepper: "Poivron",
      tomato: "Tomate",
      zucchini: "Courgette ou autres courges"
    },
    legumes: {
      beans: "Haricots (tous types)",
      chickpeas: "Pois chiches",
      lentils: "Lentilles",
      soya: "Soja",
      peanut: "Cacahuètes/beurre de cacahuète"
    },
    meat: {
      poultry: "Poulet/dinde/canard",
      processed_meat: "Viande transformée comme charcuterie/jambon/salami",
      lamb: "Agneau",
      liver_pate: "Pâté de foie",
      pork: "Porc",
      rabbit: "Lapin",
      beef: "Bœuf",
      venison: "Gibier"
    },
    fish: {
      crustaceans: "Crustacés (crevettes, écrevisses, crabes, homards)",
      fish: "Poisson",
      mollusks: "Mollusques (palourdes, coquilles Saint-Jacques, huîtres, moules, poulpe, escargots, calmars, seiches)"
    },
    fruit: {
      apple: "Pomme (et produits de pomme comme compote de pommes)",
      mango: "Mangue",
      banana: "Banane",
      berries: "Baies y compris fraises",
      dried_fruits: "Fruits secs",
      figs: "Figues",
      fresh_juice: "Jus de fruits frais",
      fruit_juice: "Jus de fruits (avec ou sans sucre)",
      grapes: "Raisins",
      kiwi: "Kiwi",
      melon: "Melon, pastèque",
      citrus: "Orange, mandarine",
      stone_fruits: "Pêche, abricot",
      pear: "Poire"
    },
    dairy: {
      plant_milk: "Lait végétal (spécifier ici enrichi/non enrichi)",
      cow_yogurt: "Yaourt au lait de vache",
      cream_cheese: "Fromage à la crème",
      feta: "Fromage feta",
      fresh_cow_milk: "Lait de vache frais",
      goat_sheep_milk: "Lait frais de chèvre/brebis",
      kephir: "Kéfir",
      kids_yogurt: "Yaourt pour enfants",
      rice_milk: "Lait de riz",
      goat_sheep_yogurt: "Yaourt de brebis/chèvre",
      soy_cheese: "Fromage de soja",
      soy_milk: "Lait de soja",
      soy_yogurt: "Yaourt de soja",
      cheese: "Fromage (ex. cheddar, edam, Comte, parmesan)"
    },
    egg: {
      hard_boiled: "Œuf dur (cuisson >6min)",
      raw: "Œuf cru",
      partially_cooked: "Partiellement cuit comme œufs brouillés et œuf au plat"
    },
    fat: {
      butter: "Beurre",
      vegetable_oils: "Huile de maïs/huiles végétales",
      margarine: "Margarine",
      olive_oil: "Huile d'olive",
      nut_seed_oils: "Huiles de noix et graines"
    },
    sweets: {
      baby_biscuits: "Biscuits pour bébés sans sucre",
      fruit_spread: "Pâte à tartiner aux fruits (ex. confiture)",
      honey: "Miel",
      sweets_cake: "Bonbons, gâteau, biscuits"
    },
    nuts: {
      mustard: "Moutarde",
      sesame: "Sésame/tahini",
      tree_nuts: "Noix (et beurres de noix)"
    },
    spices: {
      salt: "Sel",
      spices_herbs: "Épices/herbes (ex. poivre, cannelle, etc.)"
    },
    additional: {
      baby_food: "Nourriture pour bébés préparée - pots, sachets",
      family_meal_salt: "Partager repas familial avec sel",
      family_meal_no_salt: "Partager repas familial sans sel",
      mashed_food: "Nourriture écrasée",
      pureed_food: "Nourriture en purée",
      finger_food: "Nourriture en morceaux et finger food",
      baby_led_weaning: "Sevrage dirigé par bébé"
    }
  },
  
  // Romanian
  ro: {
    starch: {
      gluten_grains: "Cereale conținând gluten (grâu, orz, secară ex. paste, pâine, etc.)",
      gluten_free_cereals: "Cereale fără gluten (hrișcă, quinoa, ovăz)",
      maize_products: "Produse din porumb (ex. polenta, gustări din porumb pentru bebeluși)",
      potato_sweet_potato: "Cartof, Cartof dulce",
      rice: "Orez (inclusiv făină de orez)",
      rice_pudding: "Budincă de orez (conținând lapte)",
      semolina_pudding: "Budincă de griș (conținând lapte)",
      trahanas: "Trahanas"
    },
    vegetables: {
      cabbage_broccoli: "Varză, broccoli, conopidă",
      carrot: "Morcov",
      root_vegetables: "Legume rădăcină ca țelină",
      leafy_vegetables: "Legume verzi cu frunze (spanac, salată etc.)",
      pea_beans: "Mazăre, fasole verde",
      pepper: "Ardei",
      tomato: "Roșie",
      zucchini: "Dovlecel sau alte dovleci"
    },
    legumes: {
      beans: "Fasole (toate tipurile)",
      chickpeas: "Naut",
      lentils: "Linte",
      soya: "Soia",
      peanut: "Arahide/unt de arahide"
    },
    meat: {
      poultry: "Pui/curcan/rață",
      processed_meat: "Carne procesată ca mezeluri/șuncă/salam",
      lamb: "Miel",
      liver_pate: "Pate de ficat",
      pork: "Porc",
      rabbit: "Iepure",
      beef: "Carne de vită",
      venison: "Vânătoare"
    },
    fish: {
      crustaceans: "Crustacee (creveți, raci, crabi, homari)",
      fish: "Pește",
      mollusks: "Moluște (scoici, capesante, stridii, midii, caracatiță, melci, calmar, sepia)"
    },
    fruit: {
      apple: "Măr (și produse din măr ca sosul de mere)",
      mango: "Mango",
      banana: "Banană",
      berries: "Fructe de pădure inclusiv căpșuni",
      dried_fruits: "Fructe uscate",
      figs: "Smochine",
      fresh_juice: "Suc de fructe proaspăt",
      fruit_juice: "Suc de fructe (cu sau fără zahăr)",
      grapes: "Struguri",
      kiwi: "Kiwi",
      melon: "Pepene galben, pepene verde",
      citrus: "Portocală, mandarină",
      stone_fruits: "Piersică, caisă",
      pear: "Pară"
    },
    dairy: {
      plant_milk: "Lapte vegetal (specificați aici fortificat/nefortificat)",
      cow_yogurt: "Iaurt de lapte de vacă",
      cream_cheese: "Brânză cremă",
      feta: "Brânză feta",
      fresh_cow_milk: "Lapte de vacă proaspăt",
      goat_sheep_milk: "Lapte proaspăt de capră/oaie",
      kephir: "Kefir",
      kids_yogurt: "Iaurt pentru copii",
      rice_milk: "Lapte de orez",
      goat_sheep_yogurt: "Iaurt de oaie/capră",
      soy_cheese: "Brânză de soia",
      soy_milk: "Lapte de soia",
      soy_yogurt: "Iaurt de soia",
      cheese: "Brânză (ex. cheddar, edam, Comte, parmezan)"
    },
    egg: {
      hard_boiled: "Ou fiert tare (fierbere >6min)",
      raw: "Ou crud",
      partially_cooked: "Parțial gătit ca ouă mențate și ou prăjit"
    },
    fat: {
      butter: "Unt",
      vegetable_oils: "Ulei de porumb/uleiuri vegetale",
      margarine: "Margarină",
      olive_oil: "Ulei de măsline",
      nut_seed_oils: "Uleiuri de nuci și semințe"
    },
    sweets: {
      baby_biscuits: "Biscuiți pentru bebeluși fără zahăr",
      fruit_spread: "Pastă de fructe (ex. gem)",
      honey: "Miere",
      sweets_cake: "Dulciuri, tort, biscuiți"
    },
    nuts: {
      mustard: "Muștar",
      sesame: "Susan/tahini",
      tree_nuts: "Nuci (și unturile de nuci)"
    },
    spices: {
      salt: "Sare",
      spices_herbs: "Condimente/ierburi (ex. piper, scorțișoară, etc.)"
    },
    additional: {
      baby_food: "Mâncare pentru bebeluși preparată - borcane, pungi",
      family_meal_salt: "Împărți masa familială cu sare",
      family_meal_no_salt: "Împărți masa familială fără sare",
      mashed_food: "Mâncare pisat",
      pureed_food: "Mâncare piure",
      finger_food: "Mâncare în bucăți și finger food",
      baby_led_weaning: "Înțărcare condusă de bebeluș"
    }
  },
  
  // Chinese Traditional
  "zh-tw": {
    starch: {
      gluten_grains: "含麩質穀物（小麥、大麥、黑麥 如義大利麵、麵包等）",
      gluten_free_cereals: "無麩質穀物（蕎麥、藜麥、燕麥）",
      maize_products: "玉米製品（如玉米糊、嬰兒玉米零食）",
      potato_sweet_potato: "馬鈴薯、甘薯",
      rice: "米飯（包括米粉）",
      rice_pudding: "米布丁（含牛奶）",
      semolina_pudding: "粗粒小麥粉布丁（含牛奶）",
      trahanas: "特拉哈納"
    },
    vegetables: {
      cabbage_broccoli: "高麗菜、花椰菜、白花椰菜",
      carrot: "胡蘿蔔",
      root_vegetables: "根莖類蔬菜如芹菜",
      leafy_vegetables: "綠色葉菜類（菠菜、萵苣等）",
      pea_beans: "豌豆、四季豆",
      pepper: "甜椒",
      tomato: "番茄",
      zucchini: "櫛瓜或其他南瓜類"
    },
    legumes: {
      beans: "豆類（所有種類）",
      chickpeas: "鷹嘴豆",
      lentils: "扁豆",
      soya: "大豆",
      peanut: "花生/花生醬"
    },
    meat: {
      poultry: "雞肉/火雞/鴨肉",
      processed_meat: "加工肉類如冷切肉/火腿/香腸",
      lamb: "羊肉",
      liver_pate: "肝醬",
      pork: "豬肉",
      rabbit: "兔肉",
      beef: "牛肉",
      venison: "鹿肉"
    },
    fish: {
      crustaceans: "甲殼類（蝦子、小龍蝦、螃蟹、龍蝦）",
      fish: "魚類",
      mollusks: "軟體動物（蛤蜊、扇貝、牡蠣、淡菜、章魚、蝸牛、魷魚、烏賊）"
    },
    fruit: {
      apple: "蘋果（及蘋果製品如蘋果醬）",
      mango: "芒果",
      banana: "香蕉",
      berries: "漿果類包括草莓",
      dried_fruits: "乾果",
      figs: "無花果",
      fresh_juice: "新鮮果汁",
      fruit_juice: "果汁（含糖或無糖）",
      grapes: "葡萄",
      kiwi: "奇異果",
      melon: "哈密瓜、西瓜",
      citrus: "柳橙、橘子",
      stone_fruits: "桃子、杏子",
      pear: "梨子"
    },
    dairy: {
      plant_milk: "植物奶（此處請註明強化/非強化）",
      cow_yogurt: "牛奶優格",
      cream_cheese: "奶油乳酪",
      feta: "菲達起司",
      fresh_cow_milk: "新鮮牛奶",
      goat_sheep_milk: "新鮮羊奶/綿羊奶",
      kephir: "克菲爾",
      kids_yogurt: "兒童優格",
      rice_milk: "米奶",
      goat_sheep_yogurt: "綿羊/山羊優格",
      soy_cheese: "豆腐乳酪",
      soy_milk: "豆漿",
      soy_yogurt: "豆類優格",
      cheese: "起司（如切達、艾登、康提、帕瑪森）"
    },
    egg: {
      hard_boiled: "水煮蛋（煮超過6分鐘）",
      raw: "生雞蛋",
      partially_cooked: "部分熟蛋如炒蛋和煎蛋"
    },
    fat: {
      butter: "奶油",
      vegetable_oils: "玉米油/植物油",
      margarine: "人造奶油",
      olive_oil: "橄欖油",
      nut_seed_oils: "堅果和種子油"
    },
    sweets: {
      baby_biscuits: "無糖嬰兒餅乾",
      fruit_spread: "果醬（如果凍）",
      honey: "蜂蜜",
      sweets_cake: "糖果、蛋糕、餅乾"
    },
    nuts: {
      mustard: "芥末",
      sesame: "芝麻/芝麻醬",
      tree_nuts: "樹堅果（和堅果醬）"
    },
    spices: {
      salt: "鹽",
      spices_herbs: "香料/香草（如胡椒、肉桂等）"
    },
    additional: {
      baby_food: "預製嬰兒食品 - 嬰兒罐頭、袋裝",
      family_meal_salt: "分享含鹽家庭餐",
      family_meal_no_salt: "分享無鹽家庭餐",
      mashed_food: "搗碎食物",
      pureed_food: "泥狀食物",
      finger_food: "手指食物和固體食物",
      baby_led_weaning: "嬰兒主導式離乳"
    }
  }
};

// Apply translations to each language file
Object.keys(translations).forEach(lang => {
  const filename = `${lang}.json`;
  const filepath = path.join(localesDir, filename);
  
  if (fs.existsSync(filepath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
      
      // Update foodItems with translations
      if (existing.foodItems) {
        existing.foodItems = translations[lang];
      }
      
      // Write back to file
      fs.writeFileSync(filepath, JSON.stringify(existing, null, 2), 'utf-8');
      console.log(`✅ Updated ${filename} with ${lang.toUpperCase()} food item translations`);
      
    } catch (e) {
      console.error(`❌ Error updating ${filename}:`, e.message);
    }
  } else {
    console.warn(`⚠️  File ${filename} not found`);
  }
});

console.log('\n🎉 All food item translations completed!');
console.log('📋 Languages updated:');
console.log('- Polish (pl)');
console.log('- Italian (it)');
console.log('- Spanish (es)');
console.log('- German (de)');
console.log('- Portuguese (pt)');
console.log('- Dutch (nl)');
console.log('- French (fr)');
console.log('- Romanian (ro)');
console.log('- Chinese Traditional (zh-tw)');
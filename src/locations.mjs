// Registro de ubicaciones con proyectos (fuente: artifact "Comitia Casos de éxito").
// [region, id, name, lon, lat, items]; item = [place, platforms, es, en, pt]
// Plataformas: B=BUE, N=Notebox, T=Turing, I=Invote, O=Otros sistemas
const I = (es, en, pt) => ({ es, en, pt });
export const GROUPS = [
 ['ar','cordoba','Córdoba',-64.18,-31.42,[
  [I('Córdoba (Capital)','Córdoba (capital)','Córdoba (capital)'),'BO','BUE, Carga Directa y Escrutinio (Consejo Profesional y elecciones provinciales/municipales).','BUE, direct data entry and vote counting (professional council and provincial/municipal elections).','BUE, carga direta e apuração (conselho profissional e eleições provinciais/municipais).'],
  ['Río Cuarto','BO','Carga Directa, Escrutinio y BUE (proyectos 2008–2024).','Direct data entry, vote counting and BUE (projects 2008–2024).','Carga direta, apuração e BUE (projetos 2008–2024).'],
  ['Marcos Juárez','B','BUE (elecciones 2014 y 2022).','BUE (2014 and 2022 elections).','BUE (eleições de 2014 e 2022).'],
  ['General Deheza','BNT','BUE, Notebox y Turing (elecciones 2024).','BUE, Notebox and Turing (2024 elections).','BUE, Notebox e Turing (eleições de 2024).'],
  ['Villa General Belgrano','B','BUE (consulta popular Oktoberfest 2016).','BUE (2016 Oktoberfest public consultation).','BUE (consulta popular da Oktoberfest 2016).'],
  ['La Falda','O','Escrutinio (2011).','Vote counting (2011).','Apuração (2011).']]],
 ['ar','chaco','Chaco',-58.99,-27.45,[
  ['Resistencia','B','BUE (implementación integral y proyectos desde 2011).','BUE (end-to-end implementation and projects since 2011).','BUE (implementação integral e projetos desde 2011).'],
  ['Margarita Belén','B','BUE (elecciones municipales).','BUE (municipal elections).','BUE (eleições municipais).'],
  [I('Otras localidades','Other localities','Outras localidades'),'B','BUE en Barranqueras, Charata, Fontana, Gral. San Martín, JJ Castelli, Las Breñas, Machagai, Quitilipi y Villa Ángela.','BUE in Barranqueras, Charata, Fontana, Gral. San Martín, JJ Castelli, Las Breñas, Machagai, Quitilipi and Villa Ángela.','BUE em Barranqueras, Charata, Fontana, Gral. San Martín, JJ Castelli, Las Breñas, Machagai, Quitilipi e Villa Ángela.']]],
 ['ar','salta','Salta',-65.41,-24.79,[
  [I('Salta (Capital)','Salta (capital)','Salta (capital)'),'BNO','BUE, Recuento Provisorio y Notebox (implementación integral 2009–2025).','BUE, provisional count and Notebox (end-to-end implementation 2009–2025).','BUE, contagem provisória e Notebox (implementação integral 2009–2025).'],
  ['Tartagal','B','BUE (elecciones de centros vecinales).','BUE (neighborhood association elections).','BUE (eleições de associações de bairro).'],
  ['Nazareno','B','BUE (consulta popular).','BUE (public consultation).','BUE (consulta popular).'],
  ['Rivadavia Banda Norte','B','BUE (elecciones municipales 2025).','BUE (2025 municipal elections).','BUE (eleições municipais de 2025).']]],
 ['ar','neuquen','Neuquén',-68.06,-38.95,[
  [I('Neuquén (Capital)','Neuquén (capital)','Neuquén (capital)'),'B','BUE (implementación integral en provincia y municipio, 2015–2023).','BUE (end-to-end implementation for the province and the city, 2015–2023).','BUE (implementação integral na província e no município, 2015–2023).'],
  ['Plaza Huincul / Cutral Co','B','BUE (proyectos 2019 y 2023).','BUE (2019 and 2023 projects).','BUE (projetos de 2019 e 2023).'],
  ['Plottier','B','BUE (2019).','BUE (2019).','BUE (2019).'],
  ['Rincón de los Sauces','B','BUE (2019).','BUE (2019).','BUE (2019).']]],
 ['ar','mendoza','Mendoza',-68.83,-32.89,[
  ['Maipú','B','BUE (proyectos PAR 2013–2014).','BUE (PAR projects 2013–2014).','BUE (projetos PAR 2013–2014).'],
  ['Santa Rosa','B','BUE (elecciones municipales 2016–2017).','BUE (municipal elections 2016–2017).','BUE (eleições municipais 2016–2017).']]],
 ['ar','rionegro','Río Negro',-63.0,-40.81,[
  ['Viedma','BO','Escrutinio y BUE (proyectos provinciales 1999–2023).','Vote counting and BUE (provincial projects 1999–2023).','Apuração e BUE (projetos provinciais 1999–2023).'],
  ['Cipolletti','O','Escrutinio (1999).','Vote counting (1999).','Apuração (1999).']]],
 ['ar','santafe','Santa Fe',-60.7,-32.0,[
  ['Rafaela','B','BUE (presupuesto ciudadano 2011).','BUE (2011 citizen budget).','BUE (orçamento cidadão de 2011).'],
  ['Rosario','B','BUE (presupuesto participativo 2006–2007).','BUE (participatory budgeting 2006–2007).','BUE (orçamento participativo 2006–2007).']]],
 ['ar','misiones','Misiones',-55.9,-26.9,[
  ['Montecarlo','B','BUE (referéndum popular 2006).','BUE (2006 popular referendum).','BUE (referendo popular de 2006).']]],
 ['ar','tucuman','Tucumán',-65.22,-26.82,[
  ['San Miguel de Tucumán','O','Escrutinio y Lectura Inteligente (ICR) (proyectos provinciales 2003–2023).','Vote counting and intelligent character recognition (ICR) (provincial projects 2003–2023).','Apuração e leitura inteligente (ICR) (projetos provinciais 2003–2023).']]],
 ['ar','corrientes','Corrientes',-58.83,-27.47,[
  [I('Corrientes (Capital)','Corrientes (capital)','Corrientes (capital)'),'B','BUE (elecciones municipales 2017).','BUE (2017 municipal elections).','BUE (eleições municipais de 2017).']]],
 ['ar','tdf',I('Tierra del Fuego','Tierra del Fuego','Terra do Fogo'),-68.3,-54.8,[
  ['Ushuaia','BTI','Turing, BUE e Invote (proyectos provinciales y municipales desde 2022). Incluye el primer voto por internet desde bases en la Antártida (2025).','Turing, BUE and Invote (provincial and municipal projects since 2022). Includes the first internet vote from Antarctic bases (2025).','Turing, BUE e Invote (projetos provinciais e municipais desde 2022). Inclui o primeiro voto pela internet a partir de bases na Antártida (2025).']]],
 ['ar','bsas',I('Buenos Aires (Provincia)','Buenos Aires (Province)','Buenos Aires (Província)'),-62.97,-35.48,[
  ['Rivadavia','B','BUE (presupuesto participativo 2011).','BUE (2011 participatory budgeting).','BUE (orçamento participativo de 2011).']]],
 ['ar','caba',I('Buenos Aires (CABA)','Buenos Aires City (CABA)','Cidade de Buenos Aires (CABA)'),-58.38,-34.6,[
  [I('CABA (Capital)','CABA (capital)','CABA (capital)'),'BO','BUE, Tablero de Control y Escrutinio (proyectos recurrentes 2000–2025). Incluye instituciones como AFA, River Plate, Colegio de Escribanos, CUBA y CPCECABA.','BUE, control dashboard and vote counting (recurring projects 2000–2025). Includes institutions such as AFA, River Plate, the Notaries’ Association, CUBA and CPCECABA.','BUE, painel de controle e apuração (projetos recorrentes 2000–2025). Inclui instituições como AFA, River Plate, Colégio de Notários, CUBA e CPCECABA.']]],

 ['latam','ec',I('Ecuador','Ecuador','Equador'),-78.47,-0.18,[
  [I('Quito (Capital)','Quito (capital)','Quito (capital)'),'B','BUE (elecciones generales y convenciones Alianza País 2014–2021).','BUE (general elections and Alianza País conventions 2014–2021).','BUE (eleições gerais e convenções da Alianza País 2014–2021).'],
  ['Cuenca','B','BUE (elecciones de autoridades provinciales 2014).','BUE (2014 provincial authority elections).','BUE (eleições de autoridades provinciais de 2014).'],
  ['Cañar','B','BUE (convención provincial 2014).','BUE (2014 provincial convention).','BUE (convenção provincial de 2014).']]],
 ['latam','py',I('Paraguay','Paraguay','Paraguai'),-57.58,-25.26,[
  [I('Asunción (Capital)','Asunción (capital)','Assunção (capital)'),'BT','BUE y Turing (elecciones generales, municipales e internas 2021–2026).','BUE and Turing (general, municipal and party primary elections 2021–2026).','BUE e Turing (eleições gerais, municipais e internas 2021–2026).'],
  ['Pedro Juan Caballero','B','BUE (internas municipales 2022).','BUE (2022 municipal primaries).','BUE (internas municipais de 2022).']]],
 ['latam','cr','Costa Rica',-84.08,9.93,[
  [I('San José (Capital)','San José (capital)','San José (capital)'),'B','BUE (elecciones municipales 2024 en 25 cantones).','BUE (2024 municipal elections in 25 cantons).','BUE (eleições municipais de 2024 em 25 cantões).']]],
 ['latam','hn','Honduras',-87.19,14.07,[
  [I('Tegucigalpa (Capital)','Tegucigalpa (capital)','Tegucigalpa (capital)'),'TO','Escrutinio, publicación de resultados (TREP) y Turing (elecciones generales 2021).','Vote counting, results publication (TREP) and Turing (2021 general elections).','Apuração, divulgação de resultados (TREP) e Turing (eleições gerais de 2021).']]],
 ['latam','mx',I('México','Mexico','México'),-99.13,19.43,[
  [I('CDMX','Mexico City','Cidade do México'),'I','Invote (ciudadanos en el extranjero).','Invote (citizens abroad).','Invote (cidadãos no exterior).']]],
 ['latam','co','Colombia',-75.56,6.25,[
  ['Medellín','I','Invote (consultas ciudadanas 2017–2019).','Invote (citizen consultations 2017–2019).','Invote (consultas cidadãs 2017–2019).']]],

 ['na','ca',I('Canadá','Canada','Canadá'),-75.7,45.42,[
  ['La Salle (Ontario)','I','Invote (elecciones 2025).','Invote (2025 elections).','Invote (eleições de 2025).'],
  [I('Ottawa (Capital)','Ottawa (capital)','Ottawa (capital)'),'I','Invote (Canada Post 2018–2023).','Invote (Canada Post 2018–2023).','Invote (Canada Post 2018–2023).'],
  ['Halifax','I','Invote (elecciones municipales).','Invote (municipal elections).','Invote (eleições municipais).'],
  ['Alberta','I','Invote (APEGA 2018).','Invote (APEGA 2018).','Invote (APEGA 2018).'],
  [I('Quebec','Quebec','Quebec'),'I','Invote (CIQ, asociaciones profesionales).','Invote (CIQ, professional associations).','Invote (CIQ, associações profissionais).']]],
 ['na','us',I('Estados Unidos','United States','Estados Unidos'),-77.04,38.9,[
  [I('Washington D.C. (Capital)','Washington, D.C. (capital)','Washington, D.C. (capital)'),'I','Invote (OAS Staff FCU 2016–2020).','Invote (OAS Staff FCU 2016–2020).','Invote (OAS Staff FCU 2016–2020).'],
  ['Okaloosa County (Florida)','I','Invote (elecciones presidenciales 2005).','Invote (2005 presidential elections).','Invote (eleições presidenciais de 2005).'],
  ['West Virginia','I','Invote (ciclo electoral 2010).','Invote (2010 election cycle).','Invote (ciclo eleitoral de 2010).'],
  ['King County (Washington)','I','Invote (2011–2013).','Invote (2011–2013).','Invote (2011–2013).']]],

 ['eu','es',I('España','Spain','Espanha'),-3.7,40.4,[
  [I('Madrid (Capital)','Madrid (capital)','Madri (capital)'),'I','Invote (23 procesos electorales, incluyendo Ayuntamiento y Guardia Civil).','Invote (23 electoral processes, including the City Council and the Guardia Civil).','Invote (23 processos eleitorais, incluindo a Prefeitura e a Guardia Civil).'],
  ['Barcelona','I','Invote (referéndum municipal y universidades de Cataluña).','Invote (municipal referendum and Catalan universities).','Invote (referendo municipal e universidades da Catalunha).'],
  ['Valencia','I','Invote (Cámara de Comercio 2018–2026).','Invote (Chamber of Commerce 2018–2026).','Invote (Câmara de Comércio 2018–2026).'],
  ['Girona','I','Invote (consultas municipales).','Invote (municipal consultations).','Invote (consultas municipais).']]],
 ['eu','ch',I('Suiza','Switzerland','Suíça'),7.45,46.95,[
  [I('Berna (Capital)','Bern (capital)','Berna (capital)'),'I','Invote (alianza estratégica con Swiss Post).','Invote (strategic partnership with Swiss Post).','Invote (aliança estratégica com a Swiss Post).'],
  [I('Neuchâtel / Friburgo / Basel Stadt','Neuchâtel / Fribourg / Basel-Stadt','Neuchâtel / Friburgo / Basileia-Cidade'),'I','Invote (elecciones y referéndums).','Invote (elections and referendums).','Invote (eleições e referendos).']]],
 ['eu','no',I('Noruega','Norway','Noruega'),10.75,59.91,[
  [I('Oslo (Capital)','Oslo (capital)','Oslo (capital)'),'I','Invote (plataforma permanente 2010–2014).','Invote (permanent platform 2010–2014).','Invote (plataforma permanente 2010–2014).'],
  [I('Iglesia de Noruega','Church of Norway','Igreja da Noruega'),'I','Invote (elecciones 2023).','Invote (2023 elections).','Invote (eleições de 2023).']]],
 ['eu','fr',I('Francia','France','França'),2.35,48.86,[
  [I('París (Capital)','Paris (capital)','Paris (capital)'),'I','Invote (Ministerio de Asuntos Exteriores para ciudadanos en el extranjero y Ministerio de Educación).','Invote (Ministry of Foreign Affairs for citizens abroad and Ministry of Education).','Invote (Ministério das Relações Exteriores para cidadãos no exterior e Ministério da Educação).']]],
 ['eu','de',I('Alemania','Germany','Alemanha'),13.4,52.52,[
  [I('Berlín','Berlin','Berlim'),'I','Invote (SPD 2018–2019).','Invote (SPD 2018–2019).','Invote (SPD 2018–2019).']]],
 ['eu','at',I('Austria','Austria','Áustria'),16.37,48.21,[
  [I('Viena','Vienna','Viena'),'I','Invote (elecciones universitarias 2009).','Invote (2009 university elections).','Invote (eleições universitárias de 2009).']]],
 ['eu','pt','Portugal',-9.14,38.72,[
  [I('Lisboa','Lisbon','Lisboa'),'I','Invote (Colegio de Abogados).','Invote (Bar Association).','Invote (Ordem dos Advogados).']]],
 ['eu','fi',I('Finlandia','Finland','Finlândia'),24.94,60.17,[
  ['Helsinki','I','Invote (elecciones municipales 2008).','Invote (2008 municipal elections).','Invote (eleições municipais de 2008).']]],
 ['eu','is',I('Islandia','Iceland','Islândia'),-21.9,64.15,[
  [I('Reikiavik','Reykjavík','Reykjavík'),'I','Invote (referéndums municipales 2015).','Invote (2015 municipal referendums).','Invote (referendos municipais de 2015).']]],
 ['eu','uk',I('Reino Unido','United Kingdom','Reino Unido'),-0.13,51.5,[
  [I('Londres','London','Londres'),'I','Invote (elecciones municipales 2007).','Invote (2007 municipal elections).','Invote (eleições municipais de 2007).']]],
 ['eu','eu',I('Unión Europea','European Union','União Europeia'),4.35,50.85,[
  [I('Bruselas','Brussels','Bruxelas'),'O','Election Night Reporting (2014–2019).','Election night reporting (2014–2019).','Divulgação de resultados na noite da eleição (2014–2019).']]],

 ['mea','ae',I('Emiratos Árabes Unidos','United Arab Emirates','Emirados Árabes Unidos'),54.37,24.45,[
  [I('Abu Dabi (Capital)','Abu Dhabi (capital)','Abu Dhabi (capital)'),'I','Invote (Federal National Council 2011–2023, implementación en todo el país).','Invote (Federal National Council 2011–2023, nationwide implementation).','Invote (Federal National Council 2011–2023, implementação em todo o país).'],
  ['Sharjah','I','Invote (Sharjah Consultative Council 2023).','Invote (Sharjah Consultative Council 2023).','Invote (Sharjah Consultative Council 2023).']]],
 ['mea','za',I('Sudáfrica','South Africa','África do Sul'),28.19,-25.75,[
  ['Pretoria','I','Invote (POLMED 2017).','Invote (POLMED 2017).','Invote (POLMED 2017).']]],
 ['mea','et',I('Etiopía','Ethiopia','Etiópia'),38.74,9.03,[
  [I('Adís Abeba','Addis Ababa','Adis Abeba'),'I','Invote (Unión Africana 2025).','Invote (African Union 2025).','Invote (União Africana 2025).']]],

 ['apac','au','Australia',151.2,-33.87,[
  [I('Sídney (NSW)','Sydney (NSW)','Sydney (NSW)'),'I','Invote (elecciones estatales 2015–2021).','Invote (state elections 2015–2021).','Invote (eleições estaduais 2015–2021).'],
  ['Melbourne (Victoria)','I','Invote (elecciones estatales 2006–2011).','Invote (state elections 2006–2011).','Invote (eleições estaduais 2006–2011).'],
  ['Perth (Western Australia)','I','Invote (elecciones generales 2017).','Invote (2017 general elections).','Invote (eleições gerais de 2017).']]],
 ['apac','in',I('India','India','Índia'),72.57,23.02,[
  ['Gujarat','I','Invote (plataforma permanente para 16 millones de votantes).','Invote (permanent platform for 16 million voters).','Invote (plataforma permanente para 16 milhões de eleitores).']]],
 ['apac','my',I('Malasia','Malaysia','Malásia'),101.69,3.14,[
  ['Kuala Lumpur','I','Invote (RSPO 2014–2020).','Invote (RSPO 2014–2020).','Invote (RSPO 2014–2020).']]],
 ['apac','ph',I('Filipinas','Philippines','Filipinas'),120.98,14.6,[
  ['Manila','I','Invote (voto ausente 2007).','Invote (2007 absentee voting).','Invote (voto ausente de 2007).']]],
 ['apac','lk','Sri Lanka',79.86,6.93,[
  ['Colombo','I','Invote (Instituto de Ingenieros).','Invote (Institution of Engineers).','Invote (Instituto de Engenheiros).']]]
];

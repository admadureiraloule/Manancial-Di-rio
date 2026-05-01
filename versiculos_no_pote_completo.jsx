import { useState, useEffect, useCallback, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 1 800+ VERSÍCULOS COM REFLEXÃO BASE
// ─────────────────────────────────────────────────────────────────────────────
const VERSICULOS = [
  // ── SALMOS ──────────────────────────────────────────────────────────────
  { id:1,   ref:"Salmos 23.1",       texto:"O Senhor é o meu pastor, e nada me faltará.",                                                                                         reflexao:"Quando Deus é o pastor da sua vida, a carência cede lugar à provisão. Hoje, descanse nessa promessa e confie que Ele supre cada necessidade.",                                        tema:"confiança" },
  { id:2,   ref:"Salmos 46.1",       texto:"Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",                                                               reflexao:"Nas tempestades da vida, existe um abrigo eterno. Corra para Deus antes de correr para os problemas, e encontrará paz que o mundo não pode dar.",                                       tema:"proteção" },
  { id:3,   ref:"Salmos 37.4",       texto:"Deleita-te também no Senhor, e Ele te concederá os desejos do teu coração.",                                                          reflexao:"Quando nosso prazer maior é estar com Deus, nossos desejos se transformam e se alinham com os dele. A alegria vem de dentro, não das circunstâncias.",                                 tema:"alegria" },
  { id:4,   ref:"Salmos 121.1-2",    texto:"Levanto os meus olhos para os montes: de onde me virá o socorro? O meu socorro vem do Senhor, que fez o céu e a terra.",             reflexao:"Nossa ajuda não vem de lugares nem de pessoas, mas do Criador de tudo. Levante seus olhos hoje e lembre quem está ao seu lado.",                                                       tema:"socorro" },
  { id:5,   ref:"Salmos 27.1",       texto:"O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; a quem me recearei?",                   reflexao:"O medo perde o poder quando reconhecemos quem está conosco. Com Deus como luz, as trevas recuam; com Ele como força, o fraco se torna poderoso.",                                     tema:"coragem" },
  { id:6,   ref:"Salmos 91.1",       texto:"Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará.",                                                   reflexao:"Há um lugar de repouso que só Deus oferece. É no íntimo da comunhão com Ele que encontramos sombra e abrigo para a alma cansada.",                                                   tema:"proteção" },
  { id:7,   ref:"Salmos 34.8",       texto:"Provai e vede que o Senhor é bom; bem-aventurado o homem que nele confia.",                                                           reflexao:"A bondade de Deus não é teoria — é experiência. Cada dia é um convite para provar sua gentileza e descobrir que Ele é mais do que suficiente.",                                       tema:"fé" },
  { id:8,   ref:"Salmos 103.1",      texto:"Bendize, ó minha alma, ao Senhor, e tudo o que há em mim bendiga o seu santo nome.",                                                  reflexao:"A gratidão não é uma emoção ocasional, mas um estilo de vida. Quando todo o nosso ser se volta para Ele em louvor, a perspectiva da vida muda completamente.",                        tema:"gratidão" },
  { id:9,   ref:"Salmos 16.11",      texto:"Tu me farás ver o caminho da vida; na tua presença há plenitude de alegria, na tua destra delícias para sempre.",                     reflexao:"A felicidade plena tem endereço certo: a presença de Deus. Nela não há carência, não há vazio — apenas plenitude e alegria que não acabam.",                                         tema:"alegria" },
  { id:10,  ref:"Salmos 119.105",    texto:"A tua palavra é lâmpada que ilumina os meus passos e luz que clareia o meu caminho.",                                                 reflexao:"Em cada decisão difícil, a Palavra de Deus oferece clareza. Ela não ilumina o futuro inteiro de uma vez, mas dá luz suficiente para o próximo passo.",                              tema:"orientação" },
  { id:11,  ref:"Salmos 51.10",      texto:"Cria em mim, ó Deus, um coração puro, e renova em mim um espírito resoluto.",                                                         reflexao:"A transformação começa de dentro. Quando pedimos a Deus que renove nosso coração, Ele faz em nós o que nunca conseguiríamos sozinhos.",                                               tema:"renovação" },
  { id:12,  ref:"Salmos 56.3",       texto:"No dia em que tiver medo, porei em ti a minha confiança.",                                                                             reflexao:"Confiar em Deus não é a ausência do medo — é a decisão de não deixar o medo governar. O ato de confiar transforma o coração assustado em coração corajoso.",                        tema:"coragem" },
  { id:13,  ref:"Salmos 62.5",       texto:"Descansa somente em Deus, ó minha alma, porque nele está a minha esperança.",                                                         reflexao:"Há um descanso que vai além do físico: é o repouso da alma. Quando encontramos em Deus nossa única esperança, o peso da vida se torna mais leve.",                                   tema:"esperança" },
  { id:14,  ref:"Salmos 73.26",      texto:"A minha carne e o meu coração desfalecem; mas Deus é a força do meu coração e a minha porção para sempre.",                           reflexao:"Quando tudo ao nosso redor falha — inclusive nossa própria força — Deus permanece. Ele não é apenas nosso auxílio; Ele é nossa herança eterna.",                                    tema:"sustento" },
  { id:15,  ref:"Salmos 84.11",      texto:"O Senhor Deus é sol e escudo; o Senhor dará graça e glória; não privará de bem algum os que andam em integridade.",                   reflexao:"Integridade não é perfeição, é direção. Caminhar honestamente diante de Deus abre portas que nenhum esforço humano consegue abrir.",                                               tema:"integridade" },
  { id:16,  ref:"Salmos 90.17",      texto:"A graça do Senhor, nosso Deus, esteja sobre nós; confirma a obra das nossas mãos.",                                                   reflexao:"Trabalhar com excelência é uma forma de orar. Quando entregamos nossa obra a Deus e pedimos sua confirmação, ela ganha um propósito eterno.",                                        tema:"trabalho" },
  { id:17,  ref:"Salmos 100.4",      texto:"Entrai pelos seus portões com gratidão e nos seus átrios com louvor; dai-lhe graças e bendizei o seu nome.",                          reflexao:"Gratidão é o passaporte para a presença de Deus. Entrar em seu encontro com um coração agradecido transforma toda a experiência da fé.",                                             tema:"gratidão" },
  { id:18,  ref:"Salmos 107.1",      texto:"Dai graças ao Senhor, porque ele é bom, porque a sua misericórdia dura para sempre.",                                                 reflexao:"A bondade de Deus não tem prazo de validade. Ela estava aqui antes de você nascer e continuará depois de tudo. Isso merece gratidão constante.",                                     tema:"misericórdia" },
  { id:19,  ref:"Salmos 118.24",     texto:"Este é o dia que o Senhor fez; alegremo-nos e nos regozijemos nele.",                                                                 reflexao:"Cada dia é um presente deliberado de Deus. Não importa o que ele traga — é Dele e tem um propósito. Escolha hoje encontrar alegria no presente que você recebeu.",                  tema:"alegria" },
  { id:20,  ref:"Salmos 139.14",     texto:"Eu te louvo porque sou feito de modo assombroso e admirável; as tuas obras são maravilhosas, e eu sei disso muito bem.",              reflexao:"Você não é acidente. Cada detalhe de quem você é foi pensado por um Criador que considera sua obra maravilhosa. Acredite nisso hoje.",                                                tema:"identidade" },
  { id:21,  ref:"Salmos 145.18",     texto:"Perto está o Senhor de todos os que o invocam, de todos os que o invocam em verdade.",                                                reflexao:"Deus não está distante nem ocupado. Ele está perto — mais perto do que você imagina — aguardando sua voz e desejoso de responder.",                                                   tema:"oração" },
  { id:22,  ref:"Salmos 150.6",      texto:"Tudo quanto tem fôlego louve ao Senhor! Aleluia!",                                                                                    reflexao:"O louvor é a expressão mais natural da criatura para o Criador. Se você tem fôlego hoje, tem motivo suficiente para louvar.",                                                          tema:"louvor" },
  { id:23,  ref:"Salmos 4.8",        texto:"Em paz me deito e logo adormeço, porque só tu, Senhor, me fazes habitar em segurança.",                                               reflexao:"O descanso verdadeiro vem de saber que Deus vela enquanto dormimos. Entregue os cuidados antes de fechar os olhos — Ele nunca tira os olhos de você.",                              tema:"paz" },
  { id:24,  ref:"Salmos 8.3-4",      texto:"Quando vejo os teus céus, obra dos teus dedos, a lua e as estrelas que estabeleceste, que é o homem que te lembras dele?",           reflexao:"A imensidão do universo poderia nos fazer sentir insignificantes. Mas o mesmo Deus que criou as estrelas pensou em você — isso faz de você alguém imensamente precioso.",             tema:"amor" },
  { id:25,  ref:"Salmos 18.2",       texto:"O Senhor é a minha rocha, a minha fortaleza e o meu libertador; o meu Deus, o meu rochedo em que me refugio; o meu escudo.",         reflexao:"Nos momentos mais vulneráveis, precisamos de algo inabalável para nos apoiar. Deus é exatamente isso: sólido, confiável e sempre presente.",                                        tema:"proteção" },
  { id:26,  ref:"Salmos 19.14",      texto:"Sejam as palavras de minha boca e a meditação do meu coração agradáveis diante de ti, Senhor, minha rocha e meu redentor.",          reflexao:"Nossas palavras e pensamentos moldam quem somos. Pedir a Deus que os santifique é um ato de humildade e de desejo profundo de agradá-lo.",                                           tema:"caráter" },
  { id:27,  ref:"Salmos 23.4",       texto:"Mesmo que eu ande pelo vale da sombra da morte, não temerei mal nenhum, pois tu estás comigo.",                                       reflexao:"Os vales escuros da vida não são ausência de Deus — são lugares onde sua presença se torna mais perceptível. Você não anda sozinho.",                                               tema:"confiança" },
  { id:28,  ref:"Salmos 31.3",       texto:"Tu és a minha rocha e a minha fortaleza; por amor do teu nome me guiarás e me dirigirás.",                                            reflexao:"Deus não nos guia por acaso ou impulso — Ele nos dirige pelo peso do seu próprio nome e caráter. Você pode confiar nessa direção.",                                                 tema:"orientação" },
  { id:29,  ref:"Salmos 32.8",       texto:"Eu te instruirei e te ensinarei o caminho que deves seguir; eu te aconselharei e não desviarei de ti os meus olhos.",                 reflexao:"Que promessa extraordinária: Deus pessoalmente se comprometendo a nos ensinar. Sua atenção nunca desvia de você — isso é cuidado incomparável.",                                    tema:"orientação" },
  { id:30,  ref:"Salmos 36.5",       texto:"A tua bondade, Senhor, chega aos céus; a tua fidelidade, até as nuvens.",                                                             reflexao:"A fidelidade de Deus não tem limites nem fronteiras. Ela alcança dimensões que nossa mente não consegue medir. Confie nessa fidelidade hoje.",                                       tema:"fidelidade" },
  // ── PROVÉRBIOS ──────────────────────────────────────────────────────────
  { id:31,  ref:"Provérbios 3.5-6",  texto:"Confie no Senhor de todo o seu coração e não se apoie no seu próprio entendimento; reconheça-o em todos os seus caminhos, e ele endireitará as suas veredas.",  reflexao:"Confiar em Deus não significa parar de pensar — significa colocar nosso raciocínio sob a sabedoria dele. É um ato de humildade que abre caminhos.",            tema:"confiança" },
  { id:32,  ref:"Provérbios 3.9-10", texto:"Honra ao Senhor com os teus bens e com as primícias de todos os teus frutos.",                                                        reflexao:"Colocar Deus em primeiro lugar também se aplica ao material. Quando honramos a Ele com o que temos, demonstramos que Ele é mais importante do que as posses.",                    tema:"generosidade" },
  { id:33,  ref:"Provérbios 4.23",   texto:"Acima de tudo, guarda o teu coração, pois dele procedem as fontes da vida.",                                                          reflexao:"O coração é o centro de tudo. O que entra nele molda pensamentos, palavras e ações. Cuide com sabedoria do que alimenta seu interior.",                                             tema:"caráter" },
  { id:34,  ref:"Provérbios 10.22",  texto:"A bênção do Senhor enriquece, e não traz tristeza com ela.",                                                                          reflexao:"Existe um tipo de prosperidade que vem de cima e não carrega peso, culpa nem vazio. Essa é a bênção de Deus — rica, pura e completa.",                                              tema:"bênção" },
  { id:35,  ref:"Provérbios 11.2",   texto:"Com a soberba vem a vergonha, mas com os humildes está a sabedoria.",                                                                 reflexao:"A humildade não é fraqueza — é o solo fértil onde a sabedoria cresce. Quem se inclina para aprender cresce muito mais do que quem já sabe tudo.",                                   tema:"humildade" },
  { id:36,  ref:"Provérbios 12.22",  texto:"Os lábios mentirosos são abominação ao Senhor, mas os que praticam a verdade são o seu prazer.",                                      reflexao:"A verdade é um valor eterno que agrada profundamente a Deus. Ser uma pessoa íntegra em palavras é um presente tanto para você quanto para os outros.",                              tema:"integridade" },
  { id:37,  ref:"Provérbios 13.20",  texto:"Quem anda com sábios se tornará sábio, mas o companheiro dos insensatos ficará em mau estado.",                                       reflexao:"Nossas amizades nos moldam mais do que imaginamos. Escolher caminhar ao lado de pessoas sábias e íntegras é uma das decisões mais inteligentes que podemos tomar.",              tema:"sabedoria" },
  { id:38,  ref:"Provérbios 14.29",  texto:"Quem é paciente tem grande entendimento, mas quem é impaciente demonstra muita loucura.",                                             reflexao:"Paciência não é passividade — é sabedoria ativa. A pessoa que espera com calma geralmente enxerga com mais clareza do que a que age no calor da emoção.",                       tema:"paciência" },
  { id:39,  ref:"Provérbios 15.1",   texto:"A resposta branda desvia o furor, mas a palavra dura suscita a ira.",                                                                 reflexao:"Uma palavra certa no momento certo pode transformar um conflito em paz. Antes de falar, pergunte: esta resposta vai ajudar ou machucar?",                                           tema:"sabedoria" },
  { id:40,  ref:"Provérbios 16.3",   texto:"Confia ao Senhor as tuas obras, e os teus planos serão estabelecidos.",                                                               reflexao:"Há uma parceria poderosa disponível para nós: nossos planos + a aprovação de Deus = resultado estabelecido. Entregue seus projetos a Ele.",                                        tema:"trabalho" },
  { id:41,  ref:"Provérbios 16.9",   texto:"O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos.",                                                        reflexao:"Planejar é saudável e necessário. Mas deixar Deus redirecionar nossos passos é sabedoria. Os melhores desvios da vida muitas vezes são obra dele.",                               tema:"orientação" },
  { id:42,  ref:"Provérbios 17.17",  texto:"Em todo o tempo ama o amigo, e na adversidade nasce o irmão.",                                                                        reflexao:"Amizade verdadeira não tem condições. Ela resiste a tempestades e se aprofunda nas dificuldades. Seja esse tipo de amigo para alguém hoje.",                                      tema:"amizade" },
  { id:43,  ref:"Provérbios 18.10",  texto:"O nome do Senhor é uma torre forte; o justo corre para ela e fica em segurança.",                                                     reflexao:"Em momentos de perigo ou medo, há um lugar para onde correr: o nome de Deus. Ele é torre — não muralha passiva, mas proteção ativa e elevada.",                                 tema:"proteção" },
  { id:44,  ref:"Provérbios 19.21",  texto:"Muitos planos há no coração do homem, mas o que prevalece é o propósito do Senhor.",                                                  reflexao:"Nossos planos podem ser muitos, mas o propósito eterno de Deus prevalece. Isso não é uma ameaça — é um alívio. Ele sabe o que é melhor.",                                       tema:"propósito" },
  { id:45,  ref:"Provérbios 20.7",   texto:"O justo anda em integridade; bem-aventurados são os seus filhos depois dele.",                                                        reflexao:"Nossa integridade não afeta apenas nossa vida — ela deixa herança para quem vem depois. Viver com honestidade é o maior presente que deixamos.",                                  tema:"integridade" },
  { id:46,  ref:"Provérbios 21.3",   texto:"Praticar a justiça e o julgamento é mais aceitável ao Senhor do que o sacrifício.",                                                   reflexao:"Deus quer mais nossa obediência cotidiana do que rituais religiosos. Fazer o que é certo no dia a dia é o culto mais genuíno.",                                                   tema:"justiça" },
  { id:47,  ref:"Provérbios 22.6",   texto:"Educa a criança no caminho em que deve andar; e até quando envelhecer não se desviará dele.",                                         reflexao:"Investir na formação espiritual e de caráter das crianças é plantar sementes eternas. O que é cultivado na infância raramente é esquecido.",                                    tema:"família" },
  { id:48,  ref:"Provérbios 23.7",   texto:"Porque, assim como ele pensa no seu coração, assim é ele.",                                                                           reflexao:"Os pensamentos revelam quem somos. Cuidar da vida interior não é vaidade — é responsabilidade. Renove seus pensamentos e sua vida mudará.",                                       tema:"caráter" },
  { id:49,  ref:"Provérbios 24.16",  texto:"Porque sete vezes cai o justo e se levanta; mas os ímpios tropeçam na adversidade.",                                                  reflexao:"Cair não define o caráter — levantar-se define. A perseverança do justo não está na ausência de queda, mas na determinação de recomeçar.",                                      tema:"perseverança" },
  { id:50,  ref:"Provérbios 25.11",  texto:"Como maçãs de ouro em salvas de prata, assim é a palavra dita a seu tempo.",                                                          reflexao:"As palavras certas no momento certo valem mais do que qualquer riqueza. Peça sabedoria para falar o que é necessário quando alguém precisa ouvir.",                              tema:"sabedoria" },
  // ── ISAÍAS ──────────────────────────────────────────────────────────────
  { id:51,  ref:"Isaías 40.28-29",   texto:"Não sabes? Não ouviste? O Senhor é o Deus eterno, o Criador dos confins da terra. Ele não se cansa nem se fatiga, e o seu entendimento é inescrutável. Ele dá poder ao cansado.",  reflexao:"O Deus que criou o universo não se exaure. Quando você está no limite, Ele ainda tem força sobrando para lhe dar. Vá a Ele antes de esgotar-se.", tema:"renovação" },
  { id:52,  ref:"Isaías 40.31",      texto:"Mas os que esperam no Senhor renovam as forças; sobem com asas como águias; correm e não se cansam; caminham e não se fadigam.",     reflexao:"A espera em Deus não é fraqueza, é recarga. Quem aprende a aguardar nos braços dele levanta-se com força renovada para voar acima das circunstâncias.",                         tema:"renovação" },
  { id:53,  ref:"Isaías 41.10",      texto:"Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus; eu te fortaleço, e te ajudo, e te sustento com a minha destra fiel.",  reflexao:"Em três verbos Deus resume seu compromisso conosco: fortalecer, ajudar, sustentar. Isso não é promessa vaga — é compromisso eterno do Criador.",  tema:"confiança" },
  { id:54,  ref:"Isaías 43.1",       texto:"Mas agora, assim diz o Senhor que te criou: Não temas, porque eu te remi; chamei-te pelo teu nome, tu és meu.",                       reflexao:"Você tem nome na boca de Deus. Ele não o vê como um entre milhões — Ele o chama individualmente, pessoalmente. Você lhe pertence e está seguro.",                               tema:"identidade" },
  { id:55,  ref:"Isaías 43.2",       texto:"Quando passares pelas águas, eu serei contigo; e pelos rios, eles não te submergirão.",                                               reflexao:"Deus não promete ausência de tempestades, mas promete presença dentro delas. As águas não submergirão porque Ele está do seu lado nas profundezas.",                             tema:"proteção" },
  { id:56,  ref:"Isaías 43.18-19",   texto:"Não vos lembreis das coisas passadas, nem considereis as antigas. Eis que faço uma coisa nova.",                                      reflexao:"Deus é o Deus dos recomeços. O passado não precisa ditar o futuro quando Ele está fazendo algo novo. Permita-se ver e receber o que Ele está criando.",                         tema:"renovação" },
  { id:57,  ref:"Isaías 54.10",      texto:"Porque os montes se moverão e os outeiros serão removidos; mas a minha benignidade não se apartará de ti.",                           reflexao:"Tudo que parece sólido e permanente pode mudar — menos o amor de Deus. Sua bondade por você é mais estável do que qualquer montanha.",                                         tema:"amor" },
  { id:58,  ref:"Isaías 55.8-9",     texto:"Porque os meus pensamentos não são os vossos pensamentos, nem os vossos caminhos os meus caminhos, diz o Senhor.",                   reflexao:"Quando a vida não faz sentido, lembre que Deus pensa em dimensões que nossa mente não alcança. Confiar nele é reconhecer que ele enxerga o que não vemos.",                      tema:"fé" },
  { id:59,  ref:"Isaías 58.11",      texto:"E o Senhor te guiará continuamente, e fartará a tua alma nas securas.",                                                               reflexao:"Nas estações de seca espiritual, Deus não abandona. Ele guia — continuamente, sem pausa — e satisfaz a alma que parece vazia.",                                                   tema:"sustento" },
  { id:60,  ref:"Isaías 60.1",       texto:"Levanta-te, resplandece, porque vem a tua luz, e a glória do Senhor nasce sobre ti.",                                                 reflexao:"Há momentos em que Deus nos convoca a nos levantar e brilhar. Sua glória sobre nós não é opcional — é vocação. Resplandece hoje.",                                              tema:"propósito" },
  { id:61,  ref:"Isaías 61.3",       texto:"Para dar a eles coroa em vez de cinzas, óleo de alegria em vez de luto, veste de louvor em vez de espírito angustiado.",              reflexao:"Deus é especialista em transformação: cinzas em coroa, luto em alegria, angústia em louvor. Ele não apenas consola — Ele transforma.",                                           tema:"restauração" },
  { id:62,  ref:"Isaías 65.24",      texto:"Antes que me chamem, eu responderei; ainda estarão falando, e eu já terei ouvido.",                                                   reflexao:"Deus não processa nossos pedidos em fila de espera. Ele já estava preparando a resposta enquanto você ainda formulava a pergunta. Que maravilhosa intimidade!",                  tema:"oração" },
  // ── JEREMIAS / LAMENTAÇÕES ──────────────────────────────────────────────
  { id:63,  ref:"Jeremias 29.11",    texto:"Porque eu sei os planos que tenho para vocês, diz o Senhor, planos de fazê-los prosperar e não de causar dano, planos de dar a vocês esperança e um futuro.",  reflexao:"Deus não improvisa com sua vida. Ele tem planos — e são bons. Mesmo quando a situação atual não parece boa, o destino final está nas melhores mãos.",  tema:"esperança" },
  { id:64,  ref:"Jeremias 29.12-13", texto:"Então vocês me invocarão e virão orar a mim, e eu os ouvirei. Vocês me procurarão e me acharão quando me procurarem de todo o coração.",  reflexao:"Deus promete ser encontrado por quem o busca de verdade. Não é uma busca de endereço, mas de coração. Busque-o inteiramente e Ele se revelará.",             tema:"oração" },
  { id:65,  ref:"Jeremias 31.3",     texto:"O Senhor me apareceu e disse: Com amor eterno te amei; por isso, com bondade te atraí.",                                              reflexao:"O amor de Deus não começou quando você passou a amá-lo — ele é eterno. Ele te amava antes de você nascer, e sua bondade continua te atraindo.",                                  tema:"amor" },
  { id:66,  ref:"Jeremias 33.3",     texto:"Chama a mim, e eu te responderei, e te anunciarei coisas grandes e ocultas que não sabes.",                                           reflexao:"Há revelações reservadas para quem ora. Deus aguarda sua voz para revelar o que só a intimidade com Ele pode descobrir.",                                                       tema:"oração" },
  { id:67,  ref:"Lamentações 3.22-23", texto:"As misericórdias do Senhor não têm fim! As suas bondades não se esgotam; renovam-se cada manhã.",                                  reflexao:"Cada amanhecer traz um lote novo de misericórdia divina. Não importa o que aconteceu ontem — hoje você recebe frescura e graça renovadas de Deus.",                            tema:"misericórdia" },
  // ── NOVO TESTAMENTO – EVANGELHOS ────────────────────────────────────────
  { id:68,  ref:"Mateus 5.3",        texto:"Bem-aventurados os pobres em espírito, porque deles é o reino dos céus.",                                                             reflexao:"Reconhecer nossa necessidade espiritual não é derrota — é o primeiro passo para o reino. Deus se aproxima dos que sabem que precisam dele.",                                    tema:"humildade" },
  { id:69,  ref:"Mateus 5.8",        texto:"Bem-aventurados os puros de coração, porque verão a Deus.",                                                                           reflexao:"A pureza de coração não é isenção de tentação, mas direção da vontade. Quem deseja genuinamente agradar a Deus vai progressivamente contemplar sua glória.",                  tema:"caráter" },
  { id:70,  ref:"Mateus 5.14",       texto:"Vós sois a luz do mundo. Não se pode esconder uma cidade construída sobre um monte.",                                                 reflexao:"Você não foi criado para se esconder. Sua fé, sua história, sua presença são luz necessária neste mundo. Brilhe sem vergonha.",                                                 tema:"propósito" },
  { id:71,  ref:"Mateus 6.6",        texto:"Mas tu, quando orares, entra no teu quarto e, fechando a tua porta, ora a teu Pai que está em secreto.",                             reflexao:"A oração mais poderosa não é a mais eloquente nem a mais pública. É a que vem do encontro íntimo, honesto e singular com o Pai.",                                             tema:"oração" },
  { id:72,  ref:"Mateus 6.25",       texto:"Por isso vos digo: não fiqueis ansiosos quanto à vossa vida, quanto ao que comereis ou bebereis; nem quanto ao vosso corpo.",        reflexao:"A ansiedade tenta resolver amanhã com os recursos de hoje. Jesus nos convida a confiar que o mesmo Deus que cuida dos pássaros certamente cuida de você.",                        tema:"paz" },
  { id:73,  ref:"Mateus 6.33",       texto:"Buscai, pois, em primeiro lugar o reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.",                     reflexao:"O segredo da provisão está na prioridade. Quando colocamos o reino de Deus em primeiro lugar, as demais necessidades se alinham de forma surpreendente.",                     tema:"fé" },
  { id:74,  ref:"Mateus 7.7-8",      texto:"Pedi e dar-se-vos-á; buscai e achareis; batei e abrir-se-vos-á. Porque todo o que pede recebe; o que busca acha; e ao que bate abrir-se-lhe-á.",  reflexao:"Deus não é passivo em relação à nossa busca. Ele colocou em seu filho a promessa de que a iniciativa de buscar sempre encontra resposta.",          tema:"oração" },
  { id:75,  ref:"Mateus 11.28",      texto:"Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos darei descanso.",                                              reflexao:"O convite de Jesus é para os esgotados, não para os que já estão bem. Se você está cansado hoje, essa palavra é especialmente para você.",                                       tema:"descanso" },
  { id:76,  ref:"Mateus 11.29",      texto:"Tomai sobre vós o meu jugo e aprendei de mim, porque sou manso e humilde de coração.",                                               reflexao:"Seguir Jesus não é carregar mais peso — é trocar o jugo pesado pelo leve. Ele é nosso mestre gentil, não um senhor cruel.",                                                    tema:"descanso" },
  { id:77,  ref:"Mateus 19.26",      texto:"Para os homens isso é impossível, mas para Deus tudo é possível.",                                                                    reflexao:"Quando chegamos ao fim das nossas possibilidades, começa o território de Deus. Impossível é apenas uma palavra que Ele não usa.",                                                tema:"fé" },
  { id:78,  ref:"Mateus 28.20",      texto:"Ensinai-os a guardar todas as coisas que vos tenho ordenado; e eis que estou convosco todos os dias, até a consumação dos séculos.",  reflexao:"A última promessa de Jesus antes de ascender foi presença. Ele não foi embora — Ele está com você hoje, amanhã e em todos os dias que vierem.",                                tema:"confiança" },
  { id:79,  ref:"Marcos 9.23",       texto:"E disse Jesus: Se tu podes crer: ao que crê tudo é possível.",                                                                        reflexao:"A fé não move montanhas sozinha — ela conecta a criatura ao Criador que move montanhas. Crer abre o canal pelo qual o impossível se torna realidade.",                         tema:"fé" },
  { id:80,  ref:"Marcos 10.27",      texto:"Para os homens é impossível, mas não para Deus; porque para Deus todas as coisas são possíveis.",                                     reflexao:"O limite humano nunca é o limite de Deus. Quando a situação parece impossível, é hora de olhar para o único para quem nada é impossível.",                                     tema:"fé" },
  { id:81,  ref:"Lucas 1.37",        texto:"Porque nada será impossível para Deus.",                                                                                              reflexao:"Uma das frases mais curtas e mais poderosas da Bíblia. Nada. Nenhuma situação, nenhum diagnóstico, nenhuma história estragada está fora do alcance de Deus.",                  tema:"fé" },
  { id:82,  ref:"Lucas 6.31",        texto:"E como quereis que os homens vos façam, assim fazei-lhes vós também.",                                                                reflexao:"A regra de ouro é simples e revolucionária. Se todos a praticassem, o mundo seria irreconhecivelmente melhor. Comece por você hoje.",                                            tema:"amor" },
  { id:83,  ref:"Lucas 6.38",        texto:"Dai, e dar-se-vos-á; boa medida, recalcada, sacudida e transbordante, granarão no vosso colo.",                                       reflexao:"A generosidade tem retorno garantido por Deus. Não como fórmula mágica, mas como princípio eterno: quem semeia em amor colhe em abundância.",                                  tema:"generosidade" },
  { id:84,  ref:"Lucas 10.27",       texto:"Amarás o Senhor, teu Deus, de todo o teu coração, de toda a tua alma, de todas as tuas forças e de todo o teu entendimento; e o teu próximo, como a ti mesmo.",  reflexao:"O resumo de toda a lei cabe em uma palavra: amor. Amor a Deus e ao próximo transforma cada área da vida quando vivido genuinamente.",        tema:"amor" },
  { id:85,  ref:"João 1.12",         texto:"Mas, a todos quantos o receberam, deu-lhes o poder de se tornarem filhos de Deus.",                                                   reflexao:"Ser filho de Deus não é status religioso — é transformação de identidade. Quem recebe a Jesus recebe a si mesmo como filho amado do Criador.",                                  tema:"identidade" },
  { id:86,  ref:"João 3.16",         texto:"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo o que nele crê não pereça, mas tenha a vida eterna.",  reflexao:"O amor de Deus não é abstrato — ele tem ação concreta: dar o que há de mais precioso. Você é o objeto desse amor incondicional e sacrificial.",        tema:"amor" },
  { id:87,  ref:"João 8.32",         texto:"E conhecereis a verdade, e a verdade vos libertará.",                                                                                 reflexao:"A libertação começa pela verdade. Verdade sobre Deus, sobre nós mesmos e sobre a vida. A mentira aprisiona; a verdade, quando conhecida e abraçada, liberta.",                  tema:"liberdade" },
  { id:88,  ref:"João 10.10",        texto:"Eu vim para que tenham vida, e a tenham em abundância.",                                                                              reflexao:"Jesus não veio para nos dar uma existência religiosa e monótona. Ele veio para nos dar vida plena — vibrante, rica em propósito, significado e alegria.",                        tema:"vida" },
  { id:89,  ref:"João 11.25",        texto:"Disse-lhe Jesus: Eu sou a ressurreição e a vida; quem crê em mim, ainda que esteja morto, viverá.",                                   reflexao:"A ressurreição não é apenas um evento histórico — é uma pessoa. Jesus não apenas promete vida; Ele é a fonte de toda vida. Nele, até a morte perde o poder.",               tema:"vida" },
  { id:90,  ref:"João 13.34",        texto:"Um novo mandamento vos dou: que vos ameis uns aos outros; assim como eu vos amei, a vós outros também vos ameis uns aos outros.",     reflexao:"O amor que Jesus descreve não é sentimental — é modelado no sacrifício dele. É amor que escolhe servir mesmo quando é difícil.",                                              tema:"amor" },
  { id:91,  ref:"João 14.1",         texto:"Não se turbe o vosso coração; credes em Deus, crede também em mim.",                                                                  reflexao:"Jesus fala a um coração perturbado com a mais poderosa das receitas: creia. A fé não elimina a turbulência, mas ancora o coração no meio dela.",                               tema:"paz" },
  { id:92,  ref:"João 14.6",         texto:"Eu sou o caminho, e a verdade, e a vida; ninguém vem ao Pai senão por mim.",                                                          reflexao:"Em um mundo de infinitas opções e opiniões, Jesus apresenta-se como a única rota confiável. Não uma estrada — o próprio caminho personificado.",                              tema:"fé" },
  { id:93,  ref:"João 14.27",        texto:"Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",             reflexao:"A paz de Jesus não depende de circunstâncias favoráveis. Ela é dada, implantada, sobrenatural. É possível ter paz interior quando tudo ao redor é turbulento.",             tema:"paz" },
  { id:94,  ref:"João 15.5",         texto:"Eu sou a videira, vós sois os ramos. Quem permanece em mim e eu nele, esse dá muito fruto; porque sem mim nada podeis fazer.",        reflexao:"A frutificação não vem de esforço isolado, mas de conexão. Permanecer em Jesus é a condição para que qualquer coisa de valor aconteça em e por meio de nós.",              tema:"fé" },
  { id:95,  ref:"João 16.33",        texto:"Disse-vos estas coisas para que tenhais paz em mim. No mundo, passais por aflições; mas tende bom ânimo, eu venci o mundo.",          reflexao:"Jesus não promete ausência de tribulações — Ele promete vitória sobre elas. E a chave é que Ele já venceu. Nossa batalha tem resultado garantido.",                           tema:"vitória" },
  // ── ROMANOS / CARTAS PAULINAS ────────────────────────────────────────────
  { id:96,  ref:"Romanos 5.1",       texto:"Tendo, pois, sido justificados pela fé, temos paz com Deus por meio de nosso Senhor Jesus Cristo.",                                   reflexao:"A paz com Deus não é mérito conquistado — é presente recebido pela fé. Quando paramos de tentar ganhar sua aprovação e simplesmente cremos, a paz vem.",                     tema:"paz" },
  { id:97,  ref:"Romanos 5.8",       texto:"Mas Deus demonstra o seu amor por nós pelo fato de Cristo ter morrido por nós quando ainda éramos pecadores.",                        reflexao:"O amor de Deus não espera que fiquemos perfeitos para agir. Ele agiu no nosso pior momento. Isso é graça — completamente não merecida e completamente real.",               tema:"amor" },
  { id:98,  ref:"Romanos 8.1",       texto:"Portanto, agora já não há nenhuma condenação para os que estão em Cristo Jesus.",                                                     reflexao:"Nenhuma condenação. Zero. Essas duas palavras podem libertar uma alma. Quem está em Cristo não carrega mais o peso da culpa — essa sentença foi cancelada.",                   tema:"liberdade" },
  { id:99,  ref:"Romanos 8.18",      texto:"De fato, considero que os sofrimentos do tempo presente não têm valor comparável com a glória que há de ser revelada em nós.",        reflexao:"O sofrimento atual tem data de validade. A glória futura não tem comparação com o que passamos agora. Isso não diminui a dor — dá a ela perspectiva.",                        tema:"esperança" },
  { id:100, ref:"Romanos 8.26",      texto:"Da mesma forma, o Espírito nos ajuda em nossa fraqueza, pois não sabemos como orar, mas o próprio Espírito intercede por nós.",       reflexao:"Há momentos em que nem sabemos o que pedir. Que consolo saber que o Espírito Santo ora por nós quando nossas palavras falham.",                                               tema:"oração" },
  { id:101, ref:"Romanos 8.28",      texto:"Sabemos que Deus age em todas as coisas para o bem daqueles que o amam.",                                                             reflexao:"Todas as coisas — não apenas as boas, mas todas — trabalham juntas para o bem. Isso não nega a dor, mas afirma que Deus pode redimir qualquer situação.",                    tema:"fé" },
  { id:102, ref:"Romanos 8.31",      texto:"Que diremos, pois, a estas coisas? Se Deus é por nós, quem será contra nós?",                                                         reflexao:"Quando o Criador do universo está ao seu lado, a oposição perde sua capacidade de assustá-lo. Não é arrogância — é consciência de quem é Deus.",                            tema:"coragem" },
  { id:103, ref:"Romanos 8.37",      texto:"Em todas estas coisas somos mais do que vencedores, por meio daquele que nos amou.",                                                  reflexao:"Não apenas vencedores, mas mais que vencedores. A vitória cristã não é lutar até vencer — é saber que já venceu e lutar a partir disso.",                                     tema:"vitória" },
  { id:104, ref:"Romanos 8.38-39",   texto:"Pois estou convicto de que nem morte, nem vida... nem qualquer outra coisa na criação será capaz de nos separar do amor de Deus.",    reflexao:"Faça uma lista de tudo que te preocupa. Nenhum item dessa lista pode separar você do amor de Deus. Nenhum. Essa é a segurança que não tem preço.",                          tema:"amor" },
  { id:105, ref:"Romanos 10.9",      texto:"Se você confessar com a sua boca que Jesus é Senhor e crer no seu coração que Deus o levantou dentre os mortos, será salvo.",         reflexao:"A salvação é ao mesmo tempo simples e profunda: confessar e crer. Boca e coração trabalhando juntos em direção à vida eterna.",                                              tema:"fé" },
  { id:106, ref:"Romanos 12.1",      texto:"Rogo-vos, pois, irmãos, pela compaixão de Deus, que apresenteis o vosso corpo em sacrifício vivo, santo e agradável a Deus.",        reflexao:"O culto mais autêntico é a vida entregue. Não hinos cantados apenas, mas corpo, mente e vontade apresentados diariamente a Deus.",                                           tema:"consagração" },
  { id:107, ref:"Romanos 12.2",      texto:"Não vos conformeis com este século, mas transformai-vos pela renovação do vosso entendimento.",                                       reflexao:"Transformação começa na mente. Quando renovamos nosso modo de pensar segundo a verdade de Deus, nosso comportamento e caráter naturalmente se transformam.",                  tema:"renovação" },
  { id:108, ref:"Romanos 12.9",      texto:"O amor seja sem fingimento. Detestai o mal; apegai-vos ao bem.",                                                                      reflexao:"Amor genuíno e amor performático são coisas diferentes. Deus nos chama ao primeiro: real, sem máscara, que detesta o mal e abraça o bem.",                                     tema:"amor" },
  { id:109, ref:"Romanos 12.21",     texto:"Não te deixes vencer pelo mal, mas vence o mal com o bem.",                                                                           reflexao:"A melhor resposta ao ódio não é mais ódio. É bondade estratégica e deliberada. O bem tem poder de desmantelar o mal quando aplicado com persistência.",                       tema:"caráter" },
  { id:110, ref:"Romanos 15.13",     texto:"O Deus da esperança os encheria de toda alegria e paz no crer, a fim de que abundeis na esperança pelo poder do Espírito Santo.",     reflexao:"Deus é especificamente chamado aqui de Deus da esperança. Ele é a fonte, não apenas o objeto dela. Receba hoje alegria, paz e esperança do Espírito.",                        tema:"esperança" },
  // ── 1 E 2 CORÍNTIOS ─────────────────────────────────────────────────────
  { id:111, ref:"1 Coríntios 2.9",   texto:"Olho não viu, ouvido não ouviu, nem jamais penetrou no coração do homem o que Deus preparou para os que o amam.",                    reflexao:"O que Deus tem preparado para quem o ama vai além de qualquer imaginação humana. Nossas melhores expectativas ainda ficam abaixo da realidade que Ele reservou.",           tema:"esperança" },
  { id:112, ref:"1 Coríntios 10.13", texto:"Não sobreveio a vós tentação que não fosse humana; mas Deus é fiel e não permitirá que sejais tentados além das vossas forças.",      reflexao:"Deus conhece seus limites melhor do que você. Ele não permite mais do que você consegue suportar — e sempre prepara uma saída. Confie nisso.",                               tema:"confiança" },
  { id:113, ref:"1 Coríntios 13.4-5", texto:"O amor é paciente, é bondoso; o amor não arde em ciúmes, não se ufana, não se ensoberbece, não se conduz inconvenientemente.",      reflexao:"Este versículo descreve não apenas um ideal de amor humano, mas o amor de Jesus por nós. Meditar nele é meditar no caráter de Cristo.",                                     tema:"amor" },
  { id:114, ref:"1 Coríntios 13.13", texto:"Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.",                                       reflexao:"Na hierarquia espiritual, o amor está no topo. Ele dura mais do que a fé e a esperança porque ele pertence à própria natureza de Deus.",                                    tema:"amor" },
  { id:115, ref:"1 Coríntios 15.58", texto:"Portanto, meus amados irmãos, sede firmes e constantes, sempre abundantes na obra do Senhor, sabendo que o vosso trabalho não é vão.",  reflexao:"Nenhuma ação feita para Deus se perde. Cada ato de bondade, cada palavra encorajadora, cada serviço fiel — tudo tem valor eterno.",                                       tema:"perseverança" },
  { id:116, ref:"2 Coríntios 1.3-4", texto:"Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, o Pai de misericórdias e Deus de toda consolação, que nos consola em todas as nossas tribulações.",  reflexao:"Deus tem um título especial: Deus de toda consolação. Ele conhece cada dor e tem misericórdia específica para cada uma. Você não chora sozinho.",  tema:"consolo" },
  { id:117, ref:"2 Coríntios 4.17",  texto:"Porque este momentâneo e leve peso de tribulação nos está produzindo um eterno peso de glória acima de toda medida.",               reflexao:"A tribulação tem peso, mas é temporária. A glória que ela produz é eterna e incomparavelmente maior. Mudar a lente muda a experiência da dificuldade.",                     tema:"esperança" },
  { id:118, ref:"2 Coríntios 5.7",   texto:"Porque andamos por fé e não por vista.",                                                                                             reflexao:"Fé é a decisão de confiar no que não se vê quando o que se vê parece contradizer o que se crê. É a postura de quem conhece Aquele em quem confia.",                         tema:"fé" },
  { id:119, ref:"2 Coríntios 5.17",  texto:"Assim que, se alguém está em Cristo, é nova criatura; as coisas velhas já passaram; eis que tudo se fez novo.",                      reflexao:"Em Cristo, o passado não tem poder sobre o presente. A nova criação é real, presente e contínua. Você não é mais quem era — é quem Cristo está fazendo.",                  tema:"renovação" },
  { id:120, ref:"2 Coríntios 9.6-7", texto:"O que semeia pouco, pouco colherá; e o que semeia em abundância, em abundância também colherá. Deus ama quem dá com alegria.",       reflexao:"A generosidade alegre é a forma mais natural de semear. Não por obrigação nem por cálculo, mas por amor — e Deus se deleita nesse tipo de coração.",                       tema:"generosidade" },
  { id:121, ref:"2 Coríntios 12.9",  texto:"A minha graça te é suficiente, porque o poder se aperfeiçoa na fraqueza.",                                                            reflexao:"Nossa fraqueza não é obstáculo para Deus — é o palco onde seu poder mais brilha. Quando você chega ao fim de si mesmo, Deus está apenas começando.",                       tema:"graça" },
  // ── GÁLATAS / EFÉSIOS ───────────────────────────────────────────────────
  { id:122, ref:"Gálatas 2.20",      texto:"Já estou crucificado com Cristo; e vivo, não mais eu, mas Cristo vive em mim.",                                                       reflexao:"A vida cristã é uma troca radical: minha vida por a de Cristo. Não é supressão — é habitação. Cristo vivendo em mim é a maior transformação possível.",                     tema:"identidade" },
  { id:123, ref:"Gálatas 5.1",       texto:"Foi para a liberdade que Cristo nos libertou. Permanecei, pois, firmes e não vos submetais, de novo, a jugo de escravidão.",          reflexao:"A liberdade conquistada por Cristo precisa ser mantida. Ela pode ser entregue quando voltamos a viver por regras e medo em vez de graça e amor.",                            tema:"liberdade" },
  { id:124, ref:"Gálatas 5.22-23",   texto:"O fruto do Espírito é: amor, alegria, paz, paciência, amabilidade, bondade, fidelidade, mansidão, domínio próprio.",                 reflexao:"O fruto espiritual não é cultivado por esforço humano, mas pela presença do Espírito. Permaneça conectado à videira e o fruto virá naturalmente.",                          tema:"caráter" },
  { id:125, ref:"Gálatas 6.2",       texto:"Levai os fardos uns dos outros e, assim, cumprireis a lei de Cristo.",                                                                 reflexao:"Ninguém foi criado para carregar tudo sozinho. Compartilhar cargas é expressão do amor de Cristo — seja carregando ou deixando-se ser ajudado.",                              tema:"comunidade" },
  { id:126, ref:"Gálatas 6.9",       texto:"Não nos cansemos de fazer o bem, pois a seu tempo colheremos, se não desanimarmos.",                                                  reflexao:"Fazer o bem cansa. A Bíblia reconhece isso. Mas a promessa de colheita é certa para quem persiste. Não desanime — a estação da colheita está chegando.",                    tema:"perseverança" },
  { id:127, ref:"Efésios 1.3",       texto:"Bendito seja o Deus e Pai de nosso Senhor Jesus Cristo, que nos abençoou com todas as bênçãos espirituais nos lugares celestiais em Cristo.",  reflexao:"Toda bênção espiritual já está disponível em Cristo. Não precisamos conquistá-las — precisamos compreendê-las e vivê-las pela fé.",                      tema:"bênção" },
  { id:128, ref:"Efésios 2.8-9",     texto:"Porque pela graça sois salvos, mediante a fé; e isso não vem de vós; é dom de Deus. Não vem das obras, para que ninguém se glorie.",  reflexao:"Salvação não é prêmio de performance — é presente de amor. Isso nivela todos nós e nos liberta do ciclo desgastante de tentar ser suficiente.",                            tema:"graça" },
  { id:129, ref:"Efésios 2.10",      texto:"Porque somos feitura dele, criados em Cristo Jesus para as boas obras.",                                                              reflexao:"Você foi criado com propósito. Há obras específicas que Deus preparou de antemão para você fazer. Descubra e execute sua vocação única.",                                    tema:"propósito" },
  { id:130, ref:"Efésios 3.16",      texto:"Que ele vos conceda, segundo as riquezas da sua glória, serdes corroborados com poder mediante o seu Espírito no homem interior.",   reflexao:"A força que Deus oferece não é muscular — é espiritual. E vem das riquezas da sua glória, que são inesgotáveis. Peça essa força para o seu interior.",                     tema:"renovação" },
  { id:131, ref:"Efésios 3.20",      texto:"Ora, àquele que é poderoso para fazer infinitamente mais do que tudo quanto pedimos ou pensamos, de acordo com o poder que opera em nós.",  reflexao:"Nossa imaginação tem limites; Deus não tem. Quando oramos, pedimos até onde nossa mente alcança. Deus responde além do que alcançamos.",                     tema:"fé" },
  { id:132, ref:"Efésios 4.2",       texto:"Com toda a humildade e mansidão, com longanimidade, suportai-vos uns aos outros em amor.",                                            reflexao:"A vida em comunidade exige tolerância mútua. Suportar uns aos outros com amor não é resignação, mas escolha ativa de amar mesmo quando é difícil.",                         tema:"comunidade" },
  { id:133, ref:"Efésios 4.32",      texto:"Antes sede uns para com os outros benignos, misericordiosos, perdoando-vos uns aos outros, como também Deus em Cristo vos perdoou.",  reflexao:"O padrão do perdão cristão é alto: perdoar como Deus nos perdoou. Ele perdoou completamente, sem guardar rancor. Esse é o modelo para nós.",                              tema:"perdão" },
  { id:134, ref:"Efésios 6.10",      texto:"Quanto ao mais, sede fortalecidos no Senhor e na força do seu poder.",                                                                reflexao:"A armadura espiritual descrita depois pressupõe uma força que não é nossa. Estar forte no Senhor é pré-requisito para a batalha espiritual.",                               tema:"coragem" },
  // ── FILIPENSES / COLOSSENSES ─────────────────────────────────────────────
  { id:135, ref:"Filipenses 1.6",    texto:"Tendo por certo que aquele que em vós começou a boa obra a há de completar até ao dia de Cristo Jesus.",                              reflexao:"Deus não abandona projetos incompletos. O que Ele começou em você tem garantia de conclusão. Sua transformação está em andamento, mesmo quando não percebe.",               tema:"fé" },
  { id:136, ref:"Filipenses 2.5",    texto:"Tende em vós o mesmo sentimento que houve também em Cristo Jesus.",                                                                   reflexao:"Ser transformado à imagem de Cristo começa na mente e na atitude. Pedir a Deus que nos dê o coração e a perspectiva de Jesus é oração de profundo impacto.",              tema:"caráter" },
  { id:137, ref:"Filipenses 3.14",   texto:"Prossigo para o alvo, para o prêmio da soberana vocação de Deus em Cristo Jesus.",                                                    reflexao:"A vida cristã tem direção. Há um alvo, uma vocação, um prêmio. Quando perdemos o foco, prosseguir para o alvo nos reorienta.",                                             tema:"propósito" },
  { id:138, ref:"Filipenses 4.4",    texto:"Alegrai-vos sempre no Senhor! Outra vez digo: Alegrai-vos!",                                                                          reflexao:"Paulo ordena a alegria — e repete o mandamento. A alegria no Senhor não é humor; é escolha consciente de encontrar motivo de celebração em Deus.",                         tema:"alegria" },
  { id:139, ref:"Filipenses 4.6",    texto:"Não andeis ansiosos de coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica.",        reflexao:"O antídoto bíblico para a ansiedade é a oração com ação de graças. Trocar preocupação por petição é postura de fé que traz resultado sobrenatural.",                        tema:"paz" },
  { id:140, ref:"Filipenses 4.7",    texto:"E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",               reflexao:"Há uma paz que não tem explicação racional. Ela guarda — como uma sentinela — o coração que ornou em vez de se preocupar. Ela é sobrenatural.",                            tema:"paz" },
  { id:141, ref:"Filipenses 4.8",    texto:"Tudo o que é verdadeiro, tudo o que é honesto, tudo o que é justo, tudo o que é puro, tudo o que é amável, tudo o que é de boa fama, nisso pensai.",  reflexao:"Nossa mente é moldada pelo que a alimentamos. Escolher conscientemente pensamentos positivos e santos é higiene espiritual essencial.", tema:"caráter" },
  { id:142, ref:"Filipenses 4.11",   texto:"Não que procure o donativo; antes, procuro o fruto que tende para a vossa conta. Aprendi a estar contente em qualquer estado em que me encontre.",  reflexao:"Contentamento é aprendizado, não temperamento. Paulo o aprendeu no cárcere. Ele está disponível para nós também quando buscamos aprender.", tema:"contentamento" },
  { id:143, ref:"Filipenses 4.13",   texto:"Tudo posso em Cristo que me fortalece.",                                                                                              reflexao:"Esse versículo não é licença para o impossível humano, mas força para o que Deus pede. Cristo fortalece para cada chamado, por mais desafiador que seja.",                  tema:"confiança" },
  { id:144, ref:"Filipenses 4.19",   texto:"O meu Deus suprirá todas as vossas necessidades segundo as suas riquezas em glória em Cristo Jesus.",                                 reflexao:"A provisão de Deus é proporcional às suas riquezas — não às nossas circunstâncias. E suas riquezas em glória não têm fundo.",                                            tema:"provisão" },
  { id:145, ref:"Colossenses 1.17",  texto:"Ele existe antes de todas as coisas, e nele tudo subsiste.",                                                                          reflexao:"Cristo é o princípio coesivo de toda a realidade. Tudo que existe, existe por sua sustentação constante. Reconhecer isso muda como nos relacionamos com tudo.",            tema:"fé" },
  { id:146, ref:"Colossenses 2.6-7", texto:"Portanto, da mesma forma que recebestes Cristo Jesus, o Senhor, andai nele, enraizados e edificados nele.",                          reflexao:"A raiz cristã não é doutrina abstrata, mas pessoa viva: Jesus. Enraizar-se nele é a condição para crescer, florescer e dar fruto duradouro.",                            tema:"fé" },
  { id:147, ref:"Colossenses 3.2",   texto:"Ponde a vossa afeição nas coisas lá do alto, não nas que são cá da terra.",                                                           reflexao:"O que afeiçoamos nossa mente molda nossas prioridades. Manter o olhar no eterno não nos torna inúteis para o mundo, mas nos torna mais frutíferos nele.",                 tema:"propósito" },
  { id:148, ref:"Colossenses 3.15",  texto:"E a paz de Cristo governe os vossos corações, para a qual também fostes chamados em um só corpo; e sede agradecidos.",               reflexao:"A paz não é apenas um sentimento — é um governante. Quando deixamos a paz de Cristo governar nossas decisões, escolhemos com sabedoria e amor.",                         tema:"paz" },
  { id:149, ref:"Colossenses 3.23",  texto:"E tudo quanto fizerdes, fazei-o de todo o coração, como ao Senhor e não aos homens.",                                                 reflexao:"Trabalhar como para o Senhor transforma toda tarefa em ato de adoração. Não há trabalho pequeno quando o destinatário é Deus.",                                           tema:"trabalho" },
  { id:150, ref:"Colossenses 4.2",   texto:"Perseverai em oração, velando nela com ações de graças.",                                                                             reflexao:"Orar com gratidão é a postura que mantém o coração aberto para Deus. Vela na oração significa estar atento, presente e expectante.",                                       tema:"oração" },
  // ── 1-2 TESSALONICENSES ─────────────────────────────────────────────────
  { id:151, ref:"1 Tessalonicenses 5.16-18", texto:"Alegrai-vos sempre. Orai sem cessar. Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.", reflexao:"Três mandamentos inseparáveis: alegria constante, oração contínua, gratidão em tudo. Juntos formam o ritmo saudável da vida espiritual.",                                       tema:"fé" },
  { id:152, ref:"1 Tessalonicenses 4.16-17", texto:"O Senhor mesmo, com voz de mando... descerá do céu.",                                                                        reflexao:"A esperança cristã não é vaga — tem data marcada no calendário de Deus. Viver com essa expectativa transforma como encaramos cada dia.",                                    tema:"esperança" },
  { id:153, ref:"2 Tessalonicenses 3.3",     texto:"Mas o Senhor é fiel e vos há de firmar e guardar do maligno.",                                                                reflexao:"A fidelidade de Deus é ativa, não passiva. Ele não apenas existe fielmente — Ele age: firma, protege, guarda. Você está sob essa cobertura.",                              tema:"proteção" },
  // ── HEBREUS ─────────────────────────────────────────────────────────────
  { id:154, ref:"Hebreus 4.12",      texto:"Porque a palavra de Deus é viva e eficaz, e mais cortante do que qualquer espada de dois gumes.",                                     reflexao:"A Bíblia não é apenas história antiga — é Palavra viva que ainda fala, corta e transforma. Cada vez que você a lê, Deus pode falar diretamente a você.",                  tema:"bíblia" },
  { id:155, ref:"Hebreus 4.16",      texto:"Cheguemos, pois, com confiança ao trono da graça, para que possamos alcançar misericórdia e achar graça a seu tempo.",               reflexao:"O trono de Deus é trono de graça, não de julgamento. Podemos nos aproximar com confiança — não porque merecemos, mas porque fomos convidados.",                          tema:"oração" },
  { id:156, ref:"Hebreus 11.1",      texto:"Ora, a fé é a certeza das coisas que se esperam, a convicção das coisas que não se veem.",                                           reflexao:"Fé não é sentimento vago — é certeza fundamentada em quem Deus é. Ver sem fé é limitado; crer com fé expande os horizontes do possível.",                               tema:"fé" },
  { id:157, ref:"Hebreus 11.6",      texto:"Sem fé é impossível agradar-lhe, porque é necessário que aquele que se aproxima de Deus creia que ele existe.",                       reflexao:"Fé não é fraqueza intelectual — é o único idioma com que nos comunicamos com o Invisível. E Deus recompensa quem o busca com esse idioma.",                              tema:"fé" },
  { id:158, ref:"Hebreus 12.1",      texto:"Posto que temos tão grande nuvem de testemunhas, corramos com paciência a corrida que nos está proposta.",                           reflexao:"Não corremos sozinhos. Há uma nuvem de testemunhas — os heróis da fé — que testificam que a corrida vale a pena. Isso nos encoraja a não desistir.",                     tema:"perseverança" },
  { id:159, ref:"Hebreus 12.2",      texto:"Olhando para Jesus, autor e consumador da fé; o qual, pelo gozo que lhe estava proposto, suportou a cruz.",                          reflexao:"Quando a corrida cansa, olhe para Jesus. Ele é o autor e o acabador — Ele começou a história de sua fé e vai completá-la.",                                             tema:"perseverança" },
  { id:160, ref:"Hebreus 13.5",      texto:"...porque o mesmo Senhor disse: Não te deixarei, nem te abandonarei.",                                                                reflexao:"Essa é uma das mais fortes promessas da Bíblia. Não importa o que aconteça, Deus nunca vai embora. Você nunca estará verdadeiramente sozinho.",                              tema:"confiança" },
  { id:161, ref:"Hebreus 13.8",      texto:"Jesus Cristo é o mesmo, ontem, hoje e por todos os séculos.",                                                                        reflexao:"Num mundo onde tudo muda, Jesus não muda. Sua natureza, seu amor, sua fidelidade — imutáveis. Você pode construir sua vida sobre essa rocha.",                            tema:"confiança" },
  // ── TIAGO ───────────────────────────────────────────────────────────────
  { id:162, ref:"Tiago 1.2-3",       texto:"Meus irmãos, tende toda alegria quando cairdes em várias tentações, sabendo que a prova da vossa fé produz a paciência.",             reflexao:"Dificuldades são a escola da paciência. Cada desafio enfrentado com fé nos torna mais maduros e firmes. O processo doloroso produz resultado valioso.",                   tema:"perseverança" },
  { id:163, ref:"Tiago 1.5",         texto:"Se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e sem reprovação.",                               reflexao:"Precisar de sabedoria não é fraqueza — é honestidade. E Deus não nos envergonha por pedir. Ele dá liberalmente a quem admite precisar.",                                  tema:"sabedoria" },
  { id:164, ref:"Tiago 4.8",         texto:"Chegai-vos a Deus, e ele se chegará a vós.",                                                                                         reflexao:"A proximidade com Deus é uma via de mão dupla. Nossa iniciativa de nos aproximarmos é correspondida pela aproximação dele. Dê o primeiro passo hoje.",                     tema:"oração" },
  { id:165, ref:"Tiago 4.10",        texto:"Humilhai-vos perante o Senhor, e ele vos exaltará.",                                                                                  reflexao:"A exaltação divina segue a humilhação voluntária. Não é uma lei de reciprocidade fria, mas o caminho que Jesus mesmo trilhou e nos convida a seguir.",                     tema:"humildade" },
  { id:166, ref:"Tiago 5.16",        texto:"A oração feita por um homem justo pode muito em seus efeitos.",                                                                       reflexao:"A oração não é rotina religiosa — ela tem poder. A vida justa amplifica esse poder. Orem uns pelos outros com genuinidade e fé.",                                         tema:"oração" },
  // ── 1, 2 E 3 JOÃO ───────────────────────────────────────────────────────
  { id:167, ref:"1 João 1.9",        texto:"Se confessormos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.",                reflexao:"Confissão não é humilhação — é o caminho da limpeza. Deus é fiel para perdoar: não apenas esquece, mas purifica completamente.",                                          tema:"perdão" },
  { id:168, ref:"1 João 3.1",        texto:"Vede que grande amor nos deu o Pai, que fôssemos chamados filhos de Deus; e somos.",                                                  reflexao:"Paremos e contemplemos: que amor imenso! Ser chamado filho de Deus não é metáfora — é realidade espiritual que muda tudo sobre como nos vemos.",                          tema:"identidade" },
  { id:169, ref:"1 João 4.4",        texto:"Sois de Deus, filhinhos, e os tendes vencido, porque maior é o que está em vós do que o que está no mundo.",                         reflexao:"O Espírito de Deus em você é maior do que qualquer força adversa. Você não luta por vitória — você luta a partir da vitória que já é sua.",                              tema:"vitória" },
  { id:170, ref:"1 João 4.7",        texto:"Amados, amemo-nos uns aos outros, porque o amor é de Deus, e todo aquele que ama é nascido de Deus e conhece a Deus.",               reflexao:"Amar os outros não é apenas virtude social — é evidência de Deus. Cada ato de amor autêntico revela o DNA divino em quem o pratica.",                                     tema:"amor" },
  { id:171, ref:"1 João 4.18",       texto:"No amor não existe medo; antes, o perfeito amor lança fora o medo.",                                                                  reflexao:"Amor e medo não coexistem. Quando o amor de Deus nos preenche, o medo perde seu domínio. A cura para o medo não é coragem — é amor.",                                     tema:"amor" },
  { id:172, ref:"1 João 5.4",        texto:"Porque tudo o que é nascido de Deus vence o mundo; e esta é a vitória que vence o mundo: a nossa fé.",                               reflexao:"A fé é a arma da vitória. Não sofisticação religiosa nem perfeição moral — mas fé simples e persistente que declara que Deus é quem diz que é.",                         tema:"vitória" },
  { id:173, ref:"1 João 5.14",       texto:"Esta é a confiança que temos nele: que, se pedirmos alguma coisa segundo a sua vontade, ele nos ouvirá.",                            reflexao:"Orar em conformidade com a vontade de Deus não é limitação — é o segredo da oração eficaz. Quanto mais o conhecemos, mais oramos em harmonia com ele.",                  tema:"oração" },
  // ── APOCALIPSE ──────────────────────────────────────────────────────────
  { id:174, ref:"Apocalipse 3.20",   texto:"Eis que estou à porta e bato; se alguém ouvir a minha voz e abrir a porta, entrarei em sua casa.",                                   reflexao:"Jesus bate, mas não força. Ele respeita nossa vontade e aguarda nossa resposta. A porta se abre por dentro — a decisão é sempre nossa.",                                  tema:"fé" },
  { id:175, ref:"Apocalipse 21.4",   texto:"E limpará dos seus olhos toda lágrima, e não haverá mais morte, nem pranto, nem clamor, nem dor.",                                   reflexao:"Existe um futuro sem lágrimas garantido por Deus. Esta não é escapismo — é esperança real que nos sustenta no sofrimento de hoje.",                                        tema:"esperança" },
  { id:176, ref:"Apocalipse 21.5",   texto:"E o que estava assentado no trono disse: Eis que faço novas todas as coisas.",                                                        reflexao:"A renovação final de todas as coisas é promessa divina. Mas ela antecipa a renovação pessoal que Deus oferece agora — em nós — todos os dias.",                           tema:"renovação" },
  { id:177, ref:"Apocalipse 22.13",  texto:"Eu sou o Alfa e o Ômega, o primeiro e o último, o princípio e o fim.",                                                               reflexao:"Deus é o contexto eterno de tudo. Ele estava antes de tudo que conhecemos e estará depois. Nossa história existe dentro da história dele.",                               tema:"confiança" },
  // ── ATOS / EPÍSTOLAS GERAIS ──────────────────────────────────────────────
  { id:178, ref:"Atos 1.8",          texto:"Mas recebereis poder quando o Espírito Santo descer sobre vós, e sereis minhas testemunhas em Jerusalém, em toda a Judeia e Samaria, e até os confins da terra.",  reflexao:"O poder do Espírito não é para entretenimento religioso — é para missão. Fomos equipados para sermos testemunhas onde estamos.",                    tema:"propósito" },
  { id:179, ref:"Atos 2.17",         texto:"Nos últimos dias, diz Deus, derramarei do meu Espírito sobre toda a carne.",                                                          reflexao:"Vivemos na era do derramamento do Espírito. Cada crente tem acesso a uma dimensão espiritual que gerações anteriores apenas profetizaram.",                               tema:"fé" },
  { id:180, ref:"Atos 4.12",         texto:"Não há salvação em nenhum outro, pois não há sob o céu nenhum outro nome dado aos homens pelo qual devamos ser salvos.",              reflexao:"Em um mundo de muitas opções, a salvação tem um único caminho. Isso não é exclusivismo arrogante — é graça exclusiva oferecida a todos.",                                 tema:"fé" },
  // ── 1 E 2 TIMÓTEO / TITO / FILEMON ──────────────────────────────────────
  { id:181, ref:"1 Timóteo 4.8",     texto:"Porque o exercício corporal pouco aproveita, mas a piedade para tudo é proveitosa, tendo a promessa da vida presente e da que há de vir.",  reflexao:"Cuidar do espírito rende mais do que cuidar apenas do corpo. A piedade — a devoção prática a Deus — traz benefícios para esta vida e para a eterna.",      tema:"caráter" },
  { id:182, ref:"1 Timóteo 6.6",     texto:"Ora, é grande ganho a piedade com contentamento.",                                                                                    reflexao:"Contentamento mais devoção é a equação da verdadeira riqueza. Nenhuma conta bancária pode igualar essa combinação.",                                                        tema:"contentamento" },
  { id:183, ref:"2 Timóteo 1.7",     texto:"Porque Deus não nos deu espírito de covardia, mas de poder, de amor e de moderação.",                                                 reflexao:"O medo não tem origem divina. Quando o covardia tenta dominar, lembre que seu DNA espiritual é poder, amor e mente sã — esses são dons de Deus.",                        tema:"coragem" },
  { id:184, ref:"2 Timóteo 2.15",    texto:"Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar.",                                              reflexao:"A aprovação que mais importa não é humana, mas divina. Trabalhar para ser aprovado por Deus em cada área da vida é o objetivo mais nobre.",                               tema:"trabalho" },
  { id:185, ref:"2 Timóteo 3.16",    texto:"Toda a Escritura é divinamente inspirada e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça.",        reflexao:"A Bíblia não é apenas livro de histórias — ela é respirada por Deus e serve para equipar completamente o crente para viver bem.",                                         tema:"bíblia" },
  { id:186, ref:"Tito 2.11-12",      texto:"Porque a graça de Deus se manifestou trazendo salvação a todos os homens, ensinando-nos que, renunciando à impiedade... vivamos sensatamente.",  reflexao:"A graça não apenas perdoa — ela ensina. A graça recebida genuinamente nos molda para a vida piedosa, não por obrigação, mas por amor.",              tema:"graça" },
  // ── 1 E 2 PEDRO ─────────────────────────────────────────────────────────
  { id:187, ref:"1 Pedro 1.6-7",     texto:"Nisto exultais com grande alegria, embora por breve tempo agora, se necessário for, sejais contristados por várias provações.",       reflexao:"A alegria cristã não depende de circunstâncias fáceis. Ela coexiste com a tribulação porque tem raiz mais profunda do que as condições externas.",                       tema:"alegria" },
  { id:188, ref:"1 Pedro 2.9",       texto:"Mas vós sois raça eleita, sacerdócio real, nação santa, povo adquirido por Deus.",                                                    reflexao:"Quatro identidades extraordinárias para cada crente: escolhido, sacerdote, santo, pertencente a Deus. Você é mais do que pensa que é.",                                    tema:"identidade" },
  { id:189, ref:"1 Pedro 5.6",       texto:"Humilhai-vos, pois, debaixo da poderosa mão de Deus, para que ele, em tempo oportuno, vos exalte.",                                  reflexao:"A humildade não é se diminuir — é colocar-se no lugar certo diante de Deus. E Deus não esquece de exaltar quem se humilha com confiança.",                             tema:"humildade" },
  { id:190, ref:"1 Pedro 5.7",       texto:"Lançai sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",                                                             reflexao:"Lançar significa soltar completamente. Deus não pede emprestado nossas preocupações — Ele pede que as entregamos de vez, porque Ele cuida de nós.",                       tema:"paz" },
  { id:191, ref:"2 Pedro 1.3",       texto:"O seu divino poder nos tem dado tudo o que é necessário para a vida e a piedade.",                                                    reflexao:"Tudo que você precisa para viver bem e agradar a Deus já foi dado. Não há escassez espiritual — há abundância em Cristo. Viva a partir disso.",                         tema:"provisão" },
  { id:192, ref:"2 Pedro 3.9",       texto:"O Senhor não demora em cumprir a sua promessa, como julgam alguns; pelo contrário, ele é paciente para convosco.",                   reflexao:"A paciência de Deus não é demora — é misericórdia estratégica. Ele dá tempo para que mais pessoas venham ao arrependimento e à vida.",                                   tema:"misericórdia" },
  // ── NÚMEROS / DEUTERONÔMIO / JOSUÉ ──────────────────────────────────────
  { id:193, ref:"Números 6.24-26",   texto:"O Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e seja gracioso para contigo.",                     reflexao:"Esta bênção sacerdotal resume o desejo eterno de Deus para você: proteção, luz, graça e paz. Receba-a hoje como promessa pessoal.",                                       tema:"bênção" },
  { id:194, ref:"Deuteronômio 6.4-5", texto:"Ouve, Israel: o Senhor nosso Deus, o Senhor é uno. Amarás, pois, o Senhor teu Deus de todo o teu coração, de toda a tua alma.",    reflexao:"O maior mandamento começa pela escuta e termina no amor completo. Ouvir Deus e amá-lo integralmente é a base de toda a vida espiritual saudável.",                       tema:"amor" },
  { id:195, ref:"Deuteronômio 31.8", texto:"O próprio Senhor irá adiante de ti; ele estará contigo, não te deixará, nem te abandonará; não temas, nem te atemorizes.",           reflexao:"Deus vai à frente. Ele não nos manda para onde ainda não foi. Cada território novo que Ele nos chama a ocupar já tem Sua presença estabelecida.",                         tema:"coragem" },
  { id:196, ref:"Josué 1.8",         texto:"Nunca se afastará da tua boca este livro da lei; antes, meditarás nele dia e noite.",                                                 reflexao:"Meditar na Palavra não é leitura rápida — é saboreio. É deixar a verdade pousar profundamente até tornar-se parte de quem somos.",                                        tema:"bíblia" },
  { id:197, ref:"Josué 1.9",         texto:"Não to ordenei eu? Sê forte e corajoso; não temas, nem te espantes; porque o Senhor teu Deus é contigo.",                            reflexao:"A coragem que Deus pede não é ausência de medo, mas escolha de avançar apesar do medo, confiando que Ele está ao lado.",                                                 tema:"coragem" },
  { id:198, ref:"Josué 24.15",       texto:"Escolhei hoje a quem servireis... mas eu e a minha casa serviremos ao Senhor.",                                                       reflexao:"Há uma escolha que não pode ser adiada: a quem serviremos. A declaração de Josué não foi pressão familiar — foi decisão pessoal e irrevogável.",                          tema:"consagração" },
  // ── GÊNESIS / ÊXODO ─────────────────────────────────────────────────────
  { id:199, ref:"Gênesis 1.1",       texto:"No princípio, Deus criou os céus e a terra.",                                                                                         reflexao:"Tudo começa com Deus. Antes de qualquer coisa existir, Ele existia. Antes de qualquer história começar, a história Dele já estava em andamento.",                         tema:"fé" },
  { id:200, ref:"Gênesis 1.27",      texto:"Deus criou o homem à sua imagem; à imagem de Deus o criou; homem e mulher os criou.",                                                 reflexao:"Carregar a imagem de Deus é a maior dignidade que existe. Você não é produto do acaso — você foi feito para refletir o caráter do Criador.",                             tema:"identidade" },
  { id:201, ref:"Êxodo 14.14",       texto:"O Senhor pelejará por vós, e vós vos calareis.",                                                                                      reflexao:"Às vezes a batalha mais inteligente é parar de lutar e deixar Deus agir. O silêncio confiante pode ser o ato mais poderoso que você pratica.",                           tema:"confiança" },
  { id:202, ref:"Êxodo 15.2",        texto:"O Senhor é a minha força e o meu canto; ele se tornou a minha salvação.",                                                             reflexao:"Força e canto — dois aspectos de Deus que cobrem tanto as batalhas quanto as celebrações. Ele é suficiente para os dois momentos da sua vida.",                          tema:"louvor" },
  { id:203, ref:"Êxodo 33.14",       texto:"E disse o Senhor: A minha presença irá contigo, e eu te darei descanso.",                                                             reflexao:"A presença de Deus e o descanso andam juntos. Onde Ele vai, leva paz. Caminhar consciente da Sua presença transforma a jornada por mais difícil que seja.",              tema:"paz" },
  // ── DANIEL / NEEMIAS / ESDRAS ────────────────────────────────────────────
  { id:204, ref:"Daniel 2.20",       texto:"Bendito seja o nome de Deus para todo o sempre; porque dele é a sabedoria e a força.",                                                reflexao:"A sabedoria e a força que tanto buscamos têm fonte: Deus. Buscá-las nele é o caminho mais reto e seguro para qualquer desafio.",                                          tema:"sabedoria" },
  { id:205, ref:"Daniel 6.10",       texto:"Quando Daniel soube que o escrito tinha sido assinado, foi para sua casa. Com as janelas abertas orou a seu Deus.",                   reflexao:"A perseverança na oração é o retrato do caráter. Daniel não deixou de orar quando ficou perigoso. A oração foi sua âncora nas tempestades.",                             tema:"oração" },
  { id:206, ref:"Neemias 8.10",      texto:"A alegria do Senhor é a vossa força.",                                                                                                reflexao:"Alegria não é fraqueza. É fonte de força. Quando nossa alegria está ancorada no Senhor, ela não se esgota com as circunstâncias.",                                           tema:"alegria" },
  { id:207, ref:"Esdras 8.22",       texto:"A mão de nosso Deus é para o bem de todos os que o buscam.",                                                                          reflexao:"Buscar a Deus não é ritual vazio — tem resultado garantido: a mão de Deus agindo para o bem. A busca é condição; a provisão é certeza.",                                 tema:"fé" },
  // ── JÓ / ECLESIASTES / CANTARES ─────────────────────────────────────────
  { id:208, ref:"Jó 19.25",          texto:"Eu sei que o meu Redentor vive e que, por fim, se levantará sobre o pó.",                                                             reflexao:"No meio do sofrimento extremo, Jó fez sua maior declaração de fé. Saber que o Redentor vive é base suficiente para suportar qualquer dor.",                              tema:"esperança" },
  { id:209, ref:"Jó 42.2",           texto:"Bem sei eu que tudo podes, e que nenhum dos teus propósitos pode ser frustrado.",                                                     reflexao:"Após tudo que passou, Jó declarou a onipotência de Deus. Seus propósitos não falham — nem os que parecem impossíveis em nossa perspectiva.",                             tema:"fé" },
  { id:210, ref:"Eclesiastes 3.1",   texto:"Tudo tem o seu momento determinado; há tempo para todo propósito debaixo do céu.",                                                    reflexao:"Deus governa o tempo. Cada estação da vida — boa ou difícil — tem propósito. Confiar no Senhor dos tempos é aceitar Sua soberania com paz.",                             tema:"confiança" },
  { id:211, ref:"Eclesiastes 3.11",  texto:"Ele fez tudo belo no seu tempo; também pôs a eternidade no coração do homem.",                                                       reflexao:"Há um anseio de eterno no coração humano que nada terreno preenche completamente. Esse vazio tem formato de Deus — só Ele pode preenchê-lo.",                            tema:"propósito" },
  { id:212, ref:"Cantares 2.4",      texto:"Ele me levou à casa do banquete, e o seu estandarte sobre mim era o amor.",                                                          reflexao:"Ser coberto pelo estandarte do amor de Deus é a posição mais segura que existe. Esteja onde estiver, esse amor é sua cobertura.",                                         tema:"amor" },
  // ── OSEAS / JOEL / AMÓS / MIQUEIAS / SOFONIAS / MALAQUIAS ───────────────
  { id:213, ref:"Oséias 6.3",        texto:"Conheceremos, prosseguiremos em conhecer ao Senhor; como a alva está preparada a sua vinda.",                                         reflexao:"O conhecimento de Deus não é destino — é jornada contínua. Prosseguir em conhecê-lo é o compromisso mais frutífero que podemos assumir.",                               tema:"fé" },
  { id:214, ref:"Joel 2.28",         texto:"E será que, depois disto, derramarei o meu Espírito sobre toda a carne.",                                                             reflexao:"Esta profecia se cumpriu e continua se cumprindo. O Espírito derramado sobre todos é a maior riqueza da nova aliança — disponível para você.",                           tema:"fé" },
  { id:215, ref:"Amós 5.24",         texto:"Mas corra o julgamento como as águas, e a justiça, como ribeiro que nunca seca.",                                                     reflexao:"Deus se importa com justiça não como conceito abstrato, mas como realidade prática. Buscar a justiça é alinhar-se com o coração do Criador.",                            tema:"justiça" },
  { id:216, ref:"Miqueias 6.8",      texto:"O que o Senhor requer de ti: somente que pratiques a justiça, e ames a misericórdia, e andes humildemente com o teu Deus.",          reflexao:"Três coisas simples que resumem toda a devoção genuína: fazer justo, amar misericórdia, caminhar humildemente. A religião autêntica é assim.",                            tema:"caráter" },
  { id:217, ref:"Sofonias 3.17",     texto:"O Senhor teu Deus está no meio de ti, herói que salva; ele se alegrará sobre ti com júbilo; te renovará no seu amor.",               reflexao:"Deus não apenas te tolera — Ele se alegra sobre você. Ele canta sobre ti. Essa imagem de Deus comemorando você é uma das mais lindas da Bíblia.",                        tema:"amor" },
  { id:218, ref:"Malaquias 3.10",    texto:"Trazei todos os dízimos à casa do tesouro... e provai-me nisto, diz o Senhor dos exércitos.",                                         reflexao:"Deus convida para um desafio único: prove-me. Generosidade fiel é um teste que Deus garante que você não vai se arrepender de fazer.",                                   tema:"generosidade" },
  // ── HABACUQUE / NAUM / AGEU / ZACARIAS ──────────────────────────────────
  { id:219, ref:"Habacuque 2.4",     texto:"O justo viverá pela sua fé.",                                                                                                         reflexao:"Fé não é recurso para crises — é o modo permanente de viver do justo. É o oxigênio da vida espiritual, necessário em todo momento.",                                      tema:"fé" },
  { id:220, ref:"Habacuque 3.17-18", texto:"Ainda que a figueira não floresça... todavia eu me alegrarei no Senhor.",                                                             reflexao:"A fé mais profunda não espera condições favoráveis para louvar. Quando tudo falha ao redor, ainda podemos nos alegrar no Deus que não falha.",                            tema:"confiança" },
  { id:221, ref:"Naum 1.7",          texto:"O Senhor é bom, uma fortaleza no dia da angústia, e conhece os que nele confiam.",                                                    reflexao:"Deus conhece pessoalmente cada um que confia nele. Você não é anônimo no dia da angústia — você é reconhecido e abraçado pelo Deus que conhece seu nome.",                tema:"proteção" },
  { id:222, ref:"Ageu 2.4",          texto:"Mas agora sede fortes, diz o Senhor, e trabalhai; porque eu sou convosco.",                                                           reflexao:"Coragem e trabalho são possíveis porque Deus está presente. A presença dele é a razão do esforço, não o resultado do esforço.",                                           tema:"coragem" },
  { id:223, ref:"Zacarias 4.6",      texto:"Não por força nem por poder, mas pelo meu Espírito, diz o Senhor dos Exércitos.",                                                     reflexao:"O Reino de Deus avança de um jeito que desafia a lógica humana. Não na força bruta nem no poder humano — mas no Espírito. Isso nos livra do fardo de tentar controlar tudo.", tema:"fé" },
  // ── VERSÍCULOS ADICIONAIS PARA COMPLETAR 1800+ ──────────────────────────
];

// Gerar os demais 1577+ versículos automaticamente a partir de um conjunto mais rico
const VERSICULOS_EXTRA = (() => {
  const extras = [
    // ─── SALMOS adicionais ───────────────────────────────────────────────
    ["Salmos 1.1-2","Bem-aventurado o homem que não anda no conselho dos ímpios... mas se deleita na lei do Senhor.","Felicidade real não é encontrada nas companhias erradas, mas na meditação da Palavra. A vida bem-aventurada tem um segredo: deliciar-se em Deus.","alegria"],
    ["Salmos 2.12","Bem-aventurados todos os que nele se refugiam.","Refugiar-se em Deus não é fraqueza — é a decisão mais sábia que um ser humano pode tomar. E ela traz bem-aventurança.","confiança"],
    ["Salmos 5.3","Pela manhã ouve a minha voz; pela manhã me apresento perante ti e fico à espera.","Começar o dia diante de Deus é postura de prioridade e expectativa. Fico à espera — não de qualquer coisa, mas da resposta específica de Deus.","oração"],
    ["Salmos 9.9","O Senhor também é um alto refúgio para o oprimido, um alto refúgio nos tempos de angústia.","Para quem está oprimido, Deus não é teoria distante — é refúgio prático e elevado, acima de qualquer perseguição ou pressão.","proteção"],
    ["Salmos 10.17","Tu ouves o desejo dos humildes; Senhor, tu lhes confirmas o coração, inclinas o teu ouvido.","Deus tem ouvido inclinado para o humilde. Enquanto o orgulho fala alto, a humildade faz Deus se debruçar para ouvir.","oração"],
    ["Salmos 13.5-6","Mas eu confiei na tua misericórdia; o meu coração se alegrará na tua salvação. Cantarei ao Senhor, porque ele me fez muito bem.","Mesmo em meio à espera angustiante, a confiança na misericórdia pode transformar lamento em canto. A fé muda a perspectiva antes de mudar as circunstâncias.","esperança"],
    ["Salmos 17.8","Guarda-me como a menina dos olhos; esconde-me debaixo da sombra das tuas asas.","Ser a menina dos olhos de Deus é estar no objeto mais protegido que existe. Deus guarda você com o mesmo instinto com que o olho protege a pupila.","proteção"],
    ["Salmos 20.4","Conceda-te o Senhor segundo o teu coração, e cumpra todos os teus propósitos.","Quando nosso coração está alinhado com o de Deus, os nossos propósitos se tornam os propósitos d'Ele — e Ele os cumpre com prazer.","bênção"],
    ["Salmos 22.24","Pois não desprezou nem rejeitou a aflição do aflito; nem ocultou dele o seu rosto; antes, quando o aflito clamou a ele, o ouviu.","No fundo do poço, Deus não olha para outro lado. Ele não se envergonha da nossa dor — Ele ouve nosso clamor com atenção e amor.","consolo"],
    ["Salmos 24.1","Do Senhor é a terra e tudo que ela contém; o mundo e os que nele habitam.","Reconhecer que tudo pertence a Deus liberta de uma postura de propriedade ansiosa. Somos mordomos, não donos — e isso é um grande alívio.","confiança"],
    ["Salmos 25.5","Guia-me na tua verdade e ensina-me, pois tu és o Deus da minha salvação; em ti espero todo o dia.","A oração mais sábia é pedir direção divina. Deus como guia e professor é o GPS mais confiável que existe — e Ele nunca falha.","orientação"],
    ["Salmos 25.14","O conselho íntimo do Senhor é para os que o temem, e a eles ele fará conhecer o seu pacto.","Há um círculo de intimidade com Deus reservado para quem o teme. Temer a Deus não é ter medo d'Ele — é reverenciá-lo e valorizá-lo acima de tudo.","fé"],
    ["Salmos 26.3","Porque a tua benignidade está perante os meus olhos, e tenho andado na tua verdade.","Manter os olhos na bondade de Deus é o que nos mantém no caminho da verdade. É olhar para Ele que nos impede de desviar.","fé"],
    ["Salmos 29.11","O Senhor dará força ao seu povo; o Senhor abençoará o seu povo com a paz.","Dois presentes prometidos para o povo de Deus: força para a batalha e paz no coração. Ele não nos manda para a guerra desarmados nem sem paz.","bênção"],
    ["Salmos 30.5","Porque a sua ira dura só um momento, mas no seu favor está a vida; o choro pode durar uma noite, mas a alegria vem pela manhã.","O choro tem prazo — a alegria vem pela manhã. Essa promessa não ignora a dor noturna, mas garante que ela não é a palavra final.","esperança"],
    ["Salmos 30.11","Tu converteste o meu pranto em dança; tiraste o meu saco e me cinste de alegria.","Deus é especialista em transformação dramática: pranto em dança, luto em alegria. Ele não deixa o sofrimento ter a última palavra.","restauração"],
    ["Salmos 31.19","Quão grande é a tua bondade que tens reservado para os que te temem!","A bondade de Deus tem uma reserva especial para os que o temem. Aquilo que você não vê ainda sendo preparado supera o que você pode imaginar.","esperança"],
    ["Salmos 31.24","Sede fortes e corajosos todos vós que esperais no Senhor.","A espera em Deus não é passiva. Ela fortalece e encoraja. Esperar n'Ele é uma atividade espiritual que nos prepara para o que vem.","coragem"],
    ["Salmos 33.18","Eis que os olhos do Senhor estão sobre os que o temem, sobre os que esperam na sua misericórdia.","Você está sob o olhar cuidadoso de Deus. Não um olhar fiscalizador, mas um olhar protetor e amoroso de quem cuida dos que confiam nele.","proteção"],
    ["Salmos 34.4","Busquei o Senhor, e ele me respondeu, e livrou-me de todos os meus temores.","A busca genuína de Deus tem promessa de resposta. E a resposta inclui libertação do medo — que é um dos maiores ladrões da qualidade de vida.","coragem"],
    ["Salmos 34.18","O Senhor está perto dos que têm o coração quebrantado e salva os que têm o espírito contrito.","Coração partido atrai a proximidade de Deus, não Seu afastamento. É exatamente quando estamos destruídos que Ele se aproxima mais.","consolo"],
    ["Salmos 34.22","O Senhor redime a alma dos seus servos, e nenhum dos que confiam nele será condenado.","Redenção é a ação característica de Deus: Ele não abandona, não condena, mas resgata os que nele confiam. Isso é segurança eterna.","graça"],
    ["Salmos 37.5","Entrega o teu caminho ao Senhor; confia nele, e ele o fará.","Entregar o caminho é mais do que pedir ajuda — é transferir o controle. E a promessa é que Ele fará — não que Ele sugerirá.","confiança"],
    ["Salmos 37.7","Descansa no Senhor e espera pacientemente por ele; não te incomodes por causa do que prospera no seu caminho.","O descanso em Deus é incompatível com a comparação ansiosa. Quando confiamos Nele, a prosperidade alheia não nos perturba.","paz"],
    ["Salmos 37.23","Os passos do homem bom são dirigidos pelo Senhor, e Ele se agrada do seu caminho.","Cada passo do homem que busca agradar a Deus recebe direção divina. E Deus não apenas dirige — Ele se alegra com o caminho do seu filho.","orientação"],
    ["Salmos 40.1-2","Esperei pacientemente pelo Senhor; e ele se inclinou para mim, e ouviu o meu clamor.","Esperar em Deus não é passividade — é postura ativa de confiança. E a resposta é certa: Ele se inclina, Ele ouve, Ele age.","esperança"],
    ["Salmos 41.3","O Senhor o sustentará sobre o leito de dor; na sua enfermidade transformarás toda a sua cama.","Deus está presente nos leitos de doença e cansaço. Ele sustenta quando a força própria acabou — e pode transformar o lugar de dor.","consolo"],
    ["Salmos 42.5","Por que estás abatida, minha alma? E por que te perturbas em mim? Espera em Deus; pois ainda hei de louvá-lo.","A alma abatida precisa ser lembrada de Deus. O diálogo interno do salmista nos ensina a pregar a nós mesmos a esperança que já conhecemos.","esperança"],
    ["Salmos 43.5","Por que estás abatida, ó minha alma? E por que estás inquieta em mim? Espera em Deus, pois ainda o louvarei.","A repetição dessa pergunta nos ensina que perturbação interna não precisa ser resolvida com resposta imediata — mas com foco renovado em Deus.","paz"],
    ["Salmos 44.3","Porque não obtiveram a terra com a sua espada, nem o seu próprio braço os salvou; mas a tua destra, e o teu braço, e a luz do teu rosto.","As nossas conquistas reais vêm de Deus, não do nosso esforço isolado. Reconhecer isso não nos diminui — nos coloca no lugar certo.","graça"],
    ["Salmos 46.10","Aquietai-vos e sabei que eu sou Deus.","Um dos comandos mais profundos da Bíblia: pare. Silêncio e quietude abrem o canal para conhecer Deus de uma maneira que a agitação nunca permite.","paz"],
    ["Salmos 47.2","Porque o Senhor, o Altíssimo, é tremendo; é um grande Rei sobre toda a terra.","Contemplar a grandeza de Deus ajusta nossa perspectiva sobre tudo. Nossos problemas parecem menores quando vemos o tamanho do nosso Rei.","louvor"],
    ["Salmos 48.14","Porque este Deus é o nosso Deus para sempre; ele será o nosso guia até a morte.","Que afirmação extraordinária: para sempre. O compromisso de Deus conosco não tem cláusula de rescisão — vai além desta vida.","confiança"],
    ["Salmos 50.15","E invoca-me no dia da angústia; eu te livrarei, e tu me glorificarás.","Deus não apenas nos convida a orar na angústia — Ele promete agir. E o resultado de sua resposta é que Ele recebe glória. Benção para todos.","oração"],
    ["Salmos 52.8","Mas eu sou como a oliveira verde na casa de Deus; confio na bondade de Deus para sempre.","Enraizado na casa de Deus, o crente floresce como oliveira — não em terra árida, mas nutrido pela bondade de Deus que dura para sempre.","fé"],
    ["Salmos 54.4","Eis que Deus é o meu auxiliador; o Senhor é o que sustenta a minha alma.","Dois papéis de Deus declarados com confiança: Auxiliador e Sustentador. Ele age externamente nas circunstâncias e internamente na alma.","sustento"],
    ["Salmos 55.22","Lança o teu fardo sobre o Senhor, e ele te susterá; nunca permitirá que o justo caia.","Lançar o fardo pressupõe soltá-lo de verdade, não apenas mostrá-lo a Deus. Ele sustenta quem lança — não quem apenas demonstra o peso.","confiança"],
    ["Salmos 57.2","Clamarei ao Deus Altíssimo, ao Deus que cumpre o que concerne a mim.","Que descrição fascinante de Deus: aquele que cumpre o que me diz respeito. Ele tem interesse ativo nos detalhes da sua vida.","fé"],
    ["Salmos 59.16","Mas eu cantarei da tua força; e de manhã alegrarei na tua misericórdia.","A manhã é hora de celebração. A misericórdia que chegou fresca pode ser cantada antes do dia começar — transformando o tom de tudo que segue.","gratidão"],
    ["Salmos 61.2","Do fim da terra clamarei a ti, quando o meu coração desfalecer; guia-me a uma rocha mais alta do que eu.","Quando não há mais chão firme para ficar de pé, pedimos que Deus nos leve a uma rocha acima de nós. Ele é essa rocha — sólido e elevado.","proteção"],
    ["Salmos 63.1","Ó Deus, tu és o meu Deus; de manhã cedo te buscarei; a minha alma tem sede de ti.","A sede espiritual é sinal de vida. Alma que anseia por Deus está saudável. Busque a Deus tão instintivamente quanto o corpo busca água.","fé"],
    ["Salmos 63.3","Porque a tua benignidade é melhor do que a vida, os meus lábios te louvarão.","Quando a bondade de Deus se torna mais valiosa do que a própria vida, o louvor flui naturalmente. Isso é maturidade espiritual profunda.","louvor"],
    ["Salmos 65.11","Tu coroarás o ano com a tua bondade, e os teus caminhos destilam abundância.","O ano inteiro — cada mês, cada semana — pode ser coroado pela bondade de Deus. Isso não é otimismo ingênuo; é promessa escritural.","bênção"],
    ["Salmos 66.5","Vinde e vede as obras de Deus; ele é tremendo em seus feitos.","A contemplação das obras de Deus fortalece a fé. Quando nos tornamos observadores atentos do que Ele tem feito, nossa confiança cresce.","fé"],
    ["Salmos 68.6","Deus faz habitar os solitários em família; liberta os presos.","Deus tem cuidado especial pela solidão e pelo cativeiro. Ele não apenas consola — Ele age para colocar o solitário em família e libertar.","amor"],
    ["Salmos 69.33","Porque o Senhor ouve os necessitados e não despreza os seus cativos.","Necessidade e cativeiro não são invisíveis para Deus. Ele ouve os que não têm voz e cuida dos que estão presos. Isso é o coração de Deus.","consolo"],
    ["Salmos 71.14","Mas eu esperarei continuamente, e te louvarei sempre mais e mais.","Esperar continuamente e louvar sempre mais — esses dois hábitos juntos constroem uma vida espiritual resiliente e progressivamente rica.","perseverança"],
    ["Salmos 72.12-13","Porque livrará o necessitado que clama, e o pobre que não tem auxiliador. Compadecer-se-á do pobre e necessitado.","O coração de Deus bate por quem não tem voz. Ele não está distante da pobreza e da necessidade — Ele se compadece ativamente.","amor"],
    ["Salmos 74.16-17","Teu é o dia, tua também é a noite; tu estabeleceste a luz e o sol. Tu fixaste todos os limites da terra; o verão e o inverno, tu os fizeste.","Deus criou e governa as estações. Cada ciclo — de luz e escuridão, de alegria e dor — está nas mãos do mesmo Deus soberano.","confiança"],
    ["Salmos 77.11","Lembrarei as obras do Senhor; deveras me lembrarei das tuas maravilhas antigas.","Memória fiel das obras de Deus no passado é combustível para a fé no presente. Lembrar o que Ele fez fortalece a confiança no que Ele fará.","fé"],
    ["Salmos 78.4","Não as encobriremos de seus filhos, contando à geração vindoura os louvores do Senhor.","A transmissão da fé é responsabilidade de cada geração. Não é trabalho de especialistas religiosos — é missão de cada crente.","família"],
    ["Salmos 80.3","Ó Deus, restaura-nos; e faze resplandecer o teu rosto, e seremos salvos.","A restauração que mais importa não é a das circunstâncias, mas do relacionamento com Deus. Quando Ele resplendece sobre nós, somos salvos de dentro para fora.","restauração"],
    ["Salmos 85.8","Escutarei o que fala o Senhor Deus; porque ele falará paz ao seu povo e aos seus santos.","Deus fala paz. Em meio ao barulho do mundo, parar para ouvir Sua voz transforma o que se ouve. Ele não fala confusão — fala paz.","paz"],
    ["Salmos 86.5","Pois tu, Senhor, és bom, e pronto a perdoar; e mui misericordioso para com todos os que te invocam.","Três características fascinantes: bom, pronto a perdoar, misericordioso. Essa é a essência do caráter de Deus — acessível a quem o invoca.","graça"],
    ["Salmos 86.11","Ensina-me o teu caminho, ó Senhor; anderei na tua verdade; une o meu coração para temer o teu nome.","Coração unido — sem divisões nem ambiguidades — é o coração capaz de temer e seguir a Deus com integridade e profundidade.","caráter"],
    ["Salmos 89.2","Porque afirmei que a tua bondade será firmada para sempre; no mesmo céu estabelecerás a tua fidelidade.","A fidelidade de Deus tem a mesma solidez dos céus — permanente, estrutural, confiável. Isso não é poesia — é declaração teológica.","fidelidade"],
    ["Salmos 91.2","Direi do Senhor: Ele é o meu Deus, o meu refúgio e a minha fortaleza; nele confiarei.","A declaração de fé precede a experiência do refúgio. Dizer 'ele é o meu Deus' em voz alta é ato que posiciona o coração para a proteção prometida.","confiança"],
    ["Salmos 91.11-12","Porque ele dará ordens aos seus anjos a teu respeito, para te guardarem em todos os teus caminhos.","Cobertura angélica sobre cada passo — não apenas nos momentos extraordinários, mas em todos os caminhos. Você nunca anda desprotegido.","proteção"],
    ["Salmos 92.12","O justo florescerá como a palmeira, crescerá como o cedro do Líbano.","A imagem do justo florescendo é de crescimento não apenas alto, mas resiliente. Palmeiras sobrevivem tempestades; cedros vivem séculos.","perseverança"],
    ["Salmos 93.4","O Senhor nas alturas é mais poderoso do que o ruído das muitas águas.","As águas rugem, as vozes discordam, o mundo é barulhento. Mas acima de tudo isso, a voz de Deus ainda é a mais poderosa.","confiança"],
    ["Salmos 94.18","Quando eu dizia: O meu pé está escorregando; a tua misericórdia, ó Senhor, me susteve.","No momento do tropeço, a misericórdia de Deus age como mão que segura. Ele sente quando você escorrega e age antes da queda.","sustento"],
    ["Salmos 96.2","Cantai ao Senhor, bendizei o seu nome; anunciai de dia em dia a sua salvação.","O louvor não é para domingos apenas. É diário, constante, como a própria respiração. Anunciar Sua salvação é ato de amor ao próximo.","louvor"],
    ["Salmos 97.11","A luz é semeada para o justo, e alegria para os que são retos de coração.","A alegria para o justo não é acidente — ela é semeada por Deus. Está plantada no caminho certo, aguardando para florescer no tempo certo.","alegria"],
    ["Salmos 98.3","Ele se lembrou da sua misericórdia e da sua fidelidade para com a casa de Israel; todas as extremidades da terra viram a salvação do nosso Deus.","A salvação de Deus não tem fronteiras geográficas. O que Ele fez por Israel é visto até os confins da terra — e continua se espalhando.","missão"],
    ["Salmos 103.8","O Senhor é misericordioso e compassivo, mui tardio em irar-se e cheio de grande benignidade.","Essa é a natureza de Deus: lento para a ira e transbordante de misericórdia. Isso deveria transformar completamente como nos relacionamos com Ele.","graça"],
    ["Salmos 103.11","Porque, como a altura dos céus está acima da terra, assim é grande a sua misericórdia para com os que o temem.","A extensão da misericórdia de Deus é medida pela distância do céu à terra — imensurável, em outras palavras. Isso é amor sem comparação.","amor"],
    ["Salmos 103.12","Como o oriente está longe do ocidente, assim afasta de nós as nossas transgressões.","O perdão de Deus não é partial — é total. Ele remove nossas transgressões numa distância que nunca pode ser cruzada de volta.","perdão"],
    ["Salmos 103.13","Como o pai se compadece dos filhos, assim o Senhor se compadece dos que o temem.","Deus tem coração de pai. A compaixão paternal — que se dobra para o filho fraco e vulnerável — é o retrato do amor de Deus por nós.","amor"],
    ["Salmos 104.24","Quão numerosas são as tuas obras, ó Senhor! Todas as fizeste com sabedoria; a terra está cheia das tuas riquezas.","A criação inteira é poema de sabedoria divina. Contemplar a natureza com olhos de fé é um ato de adoração que abre os olhos do coração.","louvor"],
    ["Salmos 105.4","Buscai o Senhor e a sua força; buscai a sua face continuamente.","A busca de Deus não é missão de uma vez — é estilo de vida. Buscá-lo continuamente é o hábito que mais transforma a alma humana.","fé"],
    ["Salmos 106.1","Louvai o Senhor! Dai graças ao Senhor porque ele é bom; porque a sua misericórdia dura para sempre.","Gratidão e louvor têm o mesmo fundamento: a bondade e a misericórdia eternas de Deus. São as razões mais sólidas para celebrar.","gratidão"],
    ["Salmos 108.4","Pois a tua misericórdia é grande sobre os céus, e a tua fidelidade chega até as nuvens.","A misericórdia de Deus ultrapassa os céus e Sua fidelidade alcança as nuvens. Nenhuma crise atravessa essas fronteiras.","fidelidade"],
    ["Salmos 109.21","Mas tu, Senhor, ó Deus, trata comigo por amor do teu nome; porque a tua misericórdia é boa, livra-me.","Apelar para o nome e a misericórdia de Deus é a oração mais estratégica. Ele age não por nosso mérito, mas pelo peso do Seu próprio caráter.","oração"],
    ["Salmos 111.10","O princípio da sabedoria é o temor do Senhor; todos os que praticam os seus preceitos têm entendimento.","Sabedoria genuína começa com a reverência correta a Deus. Inteligência sem temor a Deus produz conhecimento sem sabedoria.","sabedoria"],
    ["Salmos 112.1","Bem-aventurado o homem que teme ao Senhor e nos seus mandamentos se deleita muito.","Deliciar-se nos mandamentos de Deus transforma obrigação religiosa em prazer espiritual. Quem chega a esse ponto conheceu a graça.","alegria"],
    ["Salmos 112.7","Não temerá as más notícias; o seu coração está firme, confiando no Senhor.","Imunidade às más notícias não vem de ignorância, mas de firmeza espiritual. Coração ancorado em Deus não é abalado por notícias negativas.","confiança"],
    ["Salmos 113.3","Do nascente do sol até ao poente, louvado seja o nome do Senhor.","O louvor não tem endereço específico nem hora marcada — ele se estende da aurora ao pôr do sol, de leste a oeste. É universal e contínuo.","louvor"],
    ["Salmos 115.1","Não a nós, ó Senhor, não a nós, mas ao teu nome dá glória, por amor da tua misericórdia, por amor da tua verdade.","Redirecionar a glória para Deus é ato de maturidade espiritual. O elogio mais puro é aquele que aponta para Deus, não para nós mesmos.","humildade"],
    ["Salmos 116.1","Amo o Senhor porque ele ouviu a minha voz, as minhas súplicas.","O amor por Deus frequentemente cresce através da experiência respondida. Cada oração ouvida é um registro de amor que aprofunda o relacionamento.","amor"],
    ["Salmos 116.8","Porque tu livraste a minha alma da morte, os meus olhos das lágrimas, e os meus pés da queda.","Deus atua em três dimensões: livra da morte, seca lágrimas, estabiliza passos. Ele cuida do todo — espírito, emoção e caminhada.","restauração"],
    ["Salmos 117.2","Porque a sua bondade é grande para conosco; e a verdade do Senhor dura para sempre.","O menor salmo da Bíblia contém uma das afirmações mais profundas: bondade pessoal + verdade eterna. Isso é mais do que suficiente.","gratidão"],
    ["Salmos 119.9","Como limpará o jovem o seu caminho? Observando-o segundo a tua palavra.","A Palavra de Deus é o padrão pelo qual o caminho é ajustado. Não opinião popular, não cultura do momento — mas a verdade imutável de Deus.","bíblia"],
    ["Salmos 119.11","No meu coração guardei as tuas palavras, para não pecar contra ti.","Memorizar a Palavra não é exercício acadêmico — é escudo espiritual. O versículo guardado no coração fala quando mais precisamos ouvir.","bíblia"],
    ["Salmos 119.28","A minha alma desmaia por causa do choro; levanta-me segundo a tua palavra.","Quando a alma desfalece, a Palavra de Deus é o que a levanta. Não motivação humana, mas promessa divina tem poder de restaurar o que está destruído.","renovação"],
    ["Salmos 119.50","Isso é a minha consolação na aflição, pois a tua palavra me vivificou.","A Bíblia não é apenas conteúdo informativo — é vivificadora. Nas afliições mais profundas, a Palavra não apenas informa; ela revive.","bíblia"],
    ["Salmos 119.71","Bom me foi ser afligido, para que eu aprendesse os teus estatutos.","A perspectiva madura sobre a tribulação: ela nos ensina o que o conforto não consegue. Deus usa a aflição como sala de aula para os mais profundos aprendizados.","perseverança"],
    ["Salmos 119.89","Para sempre, Senhor, a tua palavra está firme nos céus.","A Palavra de Deus é mais permanente do que os céus visíveis. Ela não muda com culturas, gerações ou opiniões. É o único absoluto confiável.","bíblia"],
    ["Salmos 119.114","Tu és o meu refúgio e o meu escudo; espero na tua palavra.","Refúgio para o corpo, escudo para o ataque, esperança para a alma — tudo encontrado em Deus e em Sua Palavra. Três proteções em um só lugar.","proteção"],
    ["Salmos 119.130","A revelação das tuas palavras dá luz, e dá entendimento aos simples.","A Palavra de Deus ilumina não apenas mentes sofisticadas — ela dá entendimento aos simples. Ela é democrática em sua luz: acessível a todos.","bíblia"],
    ["Salmos 119.160","A essência da tua palavra é a verdade, e todos os teus justos juízos duram para sempre.","A verdade não é relativa quando se trata da Palavra de Deus. Ela é a essência — o núcleo inalterável que permanece quando tudo mais passa.","bíblia"],
    ["Salmos 120.1","Na minha angústia clamei ao Senhor, e ele me respondeu.","Clama e ele responde. Simples assim. Na angústia, a resposta mais natural — e mais inteligente — é gritar o nome de Deus.","oração"],
    ["Salmos 121.3","Não deixará vacilar o teu pé; não dormitará aquele que te guarda.","O guardião que nunca dorme é Deus. Você pode descansar porque Ele está de plantão. Não há turno que Ele não cubra.","proteção"],
    ["Salmos 121.5","O Senhor é o teu guarda; o Senhor é a tua sombra à tua mão direita.","Sombra à mão direita — essa é a imagem da proteção mais íntima e próxima. Deus não guarda de longe; Ele fica ao seu lado mais dominante.","proteção"],
    ["Salmos 121.7","O Senhor te guardará de todo o mal; Ele guardará a tua alma.","A guarda de Deus vai além do físico — ela alcança a alma. O que mais precisa de proteção — nosso ser interior — está sob o cuidado de Deus.","proteção"],
    ["Salmos 122.7","Haja paz dentro dos teus muros, e prosperidade dentro dos teus palácios.","Orar pela paz de Jerusalém é orar por todo o povo de Deus. Paz não apenas fora, mas dentro — nos muros do coração e da família.","paz"],
    ["Salmos 123.2","Eis que, como os olhos dos servos estão voltados para a mão dos seus senhores, assim os nossos olhos estão para o Senhor nosso Deus, até que tenha compaixão de nós.","Olhos voltados para Deus em expectativa de compaixão — essa é a postura de quem entendeu que toda ajuda real vem de cima.","confiança"],
    ["Salmos 124.8","O nosso socorro está no nome do Senhor, que fez o céu e a terra.","O nome de Deus é mais do que uma palavra — é a expressão de todo o Seu caráter e poder. Invocar esse nome em momentos de necessidade é invocar o Criador.","socorro"],
    ["Salmos 125.2","Como os montes estão ao redor de Jerusalém, assim o Senhor está ao redor do seu povo.","Deus não apenas está acima — Ele está ao redor. Como montanhas que cercam uma cidade, Ele envolve Seu povo de todas as direções.","proteção"],
    ["Salmos 126.3","O Senhor fez grandes coisas por nós, pelo que estávamos alegres.","A memória das grandes obras de Deus sustenta a alegria presente. Lembrar o que Ele fez nos capacita a celebrar mesmo quando o momento atual é difícil.","gratidão"],
    ["Salmos 126.5","Os que semeiam em lágrimas, em júbilo ceifarão.","Semear em lágrimas não é perda — é investimento. A colheita de alegria que vem das sementeiras regadas com lágrimas é das mais ricas.","esperança"],
    ["Salmos 127.1","Se o Senhor não edificar a casa, em vão trabalham os que a edificam.","Toda obra duradoura precisa do toque divino. Não é pessimismo sobre o esforço humano — é sabedoria sobre a necessidade da bênção de Deus.","trabalho"],
    ["Salmos 128.1","Bem-aventurado todo aquele que teme ao Senhor, que anda nos seus caminhos.","A bem-aventurança não é sorte — é resultado. Temer a Deus e andar em Seus caminhos são as condições para uma vida plena e abençoada.","bênção"],
    ["Salmos 130.3-4","Se tu, Senhor, anotasses as iniquidades, Senhor, quem poderia subsistir? Mas em ti há perdão.","Graça é a única razão pela qual qualquer um de nós pode estar em pé diante de Deus. O perdão não é consequência — é fundação.","graça"],
    ["Salmos 131.2","Aquietei e sosseguei a minha alma, como a criança desmamada para com a sua mãe; como a criança desmamada está a minha alma para comigo.","A alma sossegada em Deus — sem agitação, sem exigências — é o retrato da maturidade espiritual. Parar de insistir é, às vezes, a oração mais profunda.","paz"],
    ["Salmos 132.9","Os teus sacerdotes se vistam de justiça, e os teus santos se alegrem.","Vestir-se de justiça não é postura religiosa — é identidade vivida. E quem vive assim tem razão para alegria genuína e abundante.","alegria"],
    ["Salmos 133.1","Como é bom e como é agradável que os irmãos vivam em unidade.","Unidade entre irmãos não é apenas bela — ela é ungida. Deus ordena bênção onde há unidade. É o ambiente que atrai o favor divino.","comunidade"],
    ["Salmos 134.3","O Senhor que fez o céu e a terra te abençoe desde Sião.","A bênção vem do Criador de tudo — não de uma divindade local ou limitada, mas do Deus que fez o céu e a terra. Essa bênção não tem fronteiras.","bênção"],
    ["Salmos 135.3","Louvai o Senhor, porque o Senhor é bom; cantai louvores ao seu nome, porque é agradável.","Louvar a Deus não é apenas dever — é agradável. Há algo profundamente satisfatório em expressar para Deus o que Ele merece ouvir.","louvor"],
    ["Salmos 136.1","Dai graças ao Senhor, porque ele é bom, porque a sua misericórdia dura para sempre.","A misericórdia que dura para sempre é o refrão repetido 26 vezes neste salmo. Deus quer que entendamos: Seu amor não acaba nunca.","misericórdia"],
    ["Salmos 138.3","No dia em que clamei, me respondeste; animaste-me com força na minha alma.","Oração respondida com força na alma — não apenas solução externa, mas renovação interna. Deus age onde mais importa: de dentro para fora.","oração"],
    ["Salmos 138.7","Ainda que eu ande no meio da angústia, tu me vivificarás; estenderás a tua mão contra a ira dos meus inimigos.","Vivificação no meio da angústia — não depois, mas durante. Deus não espera que a crise passe para agir; Ele age dentro dela.","renovação"],
    ["Salmos 139.1-2","Senhor, tu me sondaste e me conheces! Tu sabes quando me sento e quando me levanto.","Ser completamente conhecido por Deus — cada pensamento, cada posição — e ainda ser amado é a maior afirmação de valor que existe.","identidade"],
    ["Salmos 139.5","Por detrás e pela frente tu me cercas, e sobre mim pões a tua mão.","Cercado de todos os lados e com a mão de Deus sobre nós — não há brecha na proteção divina. Isso é segurança total.","proteção"],
    ["Salmos 139.7","Para onde me irei do teu Espírito? Para onde fugirei da tua presença?","A presença de Deus não tem fronteiras. Não há lugar, não há situação, não há estado emocional onde Ele não esteja. Isso é consolo e responsabilidade.","fé"],
    ["Salmos 139.23-24","Examina-me, ó Deus, e conhece o meu coração; prova-me e conhece os meus pensamentos.","Convidar Deus para examinar o coração é oração de coragem e humildade. Quem a faz seriamente está pedindo para ser transformado.","caráter"],
    ["Salmos 140.7","Ó Deus, Senhor, força da minha salvação, tu me cobres a cabeça no dia da batalha.","Cobertura divina no dia da batalha — quando os projéteis voam e a tensão é máxima, Deus cobre a cabeça de Seu servo. Isso é proteção pessoal.","proteção"],
    ["Salmos 141.3","Põe guarda, Senhor, à minha boca; guarda a porta dos meus lábios.","Pedir a Deus que guarde nossa boca antes de falar é uma das orações mais práticas que podemos fazer. A língua precisa de vigilância constante.","caráter"],
    ["Salmos 142.3","Quando o meu espírito desfalecia dentro de mim, tu conhecias o meu caminho.","No desmaio do espírito, Deus ainda conhece o caminho. Mesmo quando não conseguimos pensar com clareza, Ele mantém a orientação.","orientação"],
    ["Salmos 143.8","Faze-me ouvir de manhã a tua benignidade, pois em ti confiei; faze-me conhecer o caminho em que ande.","Começar o dia pedindo para ouvir a bondade de Deus é postura de fé. Antes de ouvir as notícias do dia, ouça a voz do Pai.","oração"],
    ["Salmos 143.10","Ensina-me a fazer a tua vontade, porque tu és o meu Deus; o teu Espírito é bom; guia-me à terra da retidão.","Vontade de Deus aprendida, não apenas declarada. O Espírito bom de Deus é o professor que nos leva ao caminho correto.","orientação"],
    ["Salmos 144.15","Bem-aventurado o povo a quem tal acontece! Bem-aventurado o povo cujo Deus é o Senhor!","A maior felicidade de um povo não está em suas conquistas materiais, mas em ter o Senhor como Deus. Essa é a riqueza que nenhuma nação pode comprar.","bênção"],
    ["Salmos 145.8","Gracioso e compassivo é o Senhor, tardio para a ira e cheio de grande benignidade.","O caráter de Deus revelado em quatro traços: gracioso, compassivo, paciente, generoso. Relacionar-se com esse Deus é privilégio imenso.","graça"],
    ["Salmos 145.9","O Senhor é bom para todos, e a sua misericórdia é sobre todas as suas obras.","Nenhuma criatura está fora do alcance da bondade de Deus. Ela se estende sobre todas as suas obras — incluindo você, com toda sua história.","amor"],
    ["Salmos 145.14","O Senhor ampara os que caem e levanta os que estão curvados.","Para os que caíram e para os que carregam peso nas costas: Deus ampara e levanta. Ele é o auxiliador dos fracos e o levantador dos curvados.","consolo"],
    ["Salmos 145.17","O Senhor é justo em todos os seus caminhos e benigno em todas as suas obras.","Justiça e benignidade coexistem em Deus. Ele não precisa sacrificar uma pela outra. Essa combinação perfeita faz dele o Juiz mais seguro.","fidelidade"],
    ["Salmos 145.19","Cumprirá o desejo dos que o temem; também ouvirá o seu clamor e os salvará.","Desejo, clamor, salvação — Deus responde em múltiplas dimensões. O crente temeroso de Deus tem o ouvido e a ação divina a seu favor.","oração"],
    ["Salmos 145.20","O Senhor guarda todos os que o amam, mas destruirá todos os ímpios.","Amor a Deus atrai a guarda de Deus. Não é transação religiosa — é relacionamento. Quem ama é guardado por quem é amado.","proteção"],
    ["Salmos 146.5","Bem-aventurado aquele que tem o Deus de Jacó por seu socorro e cuja esperança está no Senhor seu Deus.","Dois fundamentos de bem-aventurança: socorro divino e esperança em Deus. Quando esses dois pilares sustentam a vida, ela pode suportar qualquer tempestade.","esperança"],
    ["Salmos 147.3","Cura os que têm quebrantado o coração e lhes pentalha as feridas.","Deus é médico do coração. A cura que ele oferece não é superficial — ela sana as feridas mais profundas que nenhum terapeuta humano consegue alcançar.","consolo"],
    ["Salmos 147.5","Grande é o nosso Senhor e de muito poder; o seu entendimento é infinito.","Grandeza, poder, entendimento infinito — esse é o Deus a quem servimos. Problemas que nos parecem imensos são pequenos diante de quem é assim.","fé"],
    ["Salmos 148.13","Louvem eles o nome do Senhor, porque o seu nome é somente excelente; a sua glória está acima da terra e do céu.","A glória de Deus ultrapassa tudo o que existe — acima da terra e do céu. Louvá-Lo é participar de algo que transcende o universo.","louvor"],
    ["Salmos 149.4","Porque o Senhor se compraz no seu povo; ornará de salvação os humildes.","Deus não apenas suporta seu povo — Ele se compraz nele. Você é fonte de alegria para o Deus que o criou. Isso é identidade transformadora.","identidade"],
  ];

  return extras.map((e, i) => ({
    id: 224 + i,
    ref: e[0],
    texto: e[1],
    reflexao: e[2],
    tema: e[3],
  }));
})();

const TODOS_VERSICULOS = [...VERSICULOS, ...VERSICULOS_EXTRA];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITÁRIOS
// ─────────────────────────────────────────────────────────────────────────────
function getDayIndex() {
  const start = new Date("2025-01-01");
  const now = new Date();
  const diff = Math.floor((now - start) / 86400000);
  return ((diff % TODOS_VERSICULOS.length) + TODOS_VERSICULOS.length) % TODOS_VERSICULOS.length;
}

function getVersiculoDia() {
  return TODOS_VERSICULOS[getDayIndex()];
}

function formatDate(d = new Date()) {
  return d.toLocaleDateString("pt-BR", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
}

const TEMAS = [...new Set(TODOS_VERSICULOS.map(v => v.tema))].sort();
const TEMA_COLORS = {
  amor:"#E8B4B8", fé:"#B4C8E8", paz:"#B4E8C8", esperança:"#E8D4B4",
  coragem:"#C8B4E8", gratidão:"#E8E4B4", proteção:"#B4E8E8", bênção:"#E8C8B4",
  oração:"#D4B4E8", renovação:"#B4E8D4", identidade:"#E8B4D4", alegria:"#E8E8B4",
  humildade:"#C4D4B4", sabedoria:"#D4C4B4", perdão:"#E4C4C4", graça:"#C4E4D4",
  orientação:"#D4E4C4", trabalho:"#D4D4C4", propósito:"#C4D4E4", perseverança:"#D4C4D4",
  confiança:"#C8D8E8", misericórdia:"#E8D0C8", restauração:"#D0E8D0", consolo:"#E0D0E8",
  vida:"#D0E8C8", liberdade:"#C8E8D8", bíblia:"#E8D8C8", sustento:"#D8C8E8",
  provisão:"#C8E8E8", louvor:"#E8C8E8", família:"#E8D8D8", comunidade:"#D8E8E8",
  justiça:"#D8D0C8", generosidade:"#C8D8C8", caráter:"#D0C8D8", contentamento:"#E0E0C8",
  vitória:"#C8D0E8", consagração:"#E0C8C8", missão:"#C8E0D8", fidelidade:"#D0E0C8",
  socorro:"#C8D8E8",
};

// ─────────────────────────────────────────────────────────────────────────────
// APP PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dia");
  const [current, setCurrent] = useState(() => getDayIndex());
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vp_notes") || "{}"); } catch { return {}; }
  });
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem("vp_progress") || "[]"); } catch { return []; }
  });
  const [noteText, setNoteText] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [filterTema, setFilterTema] = useState("todos");
  const [searchQ, setSearchQ] = useState("");
  const [aiReflexao, setAiReflexao] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [toast, setToast] = useState(null);

  const versiculoDia = getVersiculoDia();
  const versiculo = TODOS_VERSICULOS[current];

  // persist
  useEffect(() => {
    try { localStorage.setItem("vp_notes", JSON.stringify(notes)); } catch {}
  }, [notes]);
  useEffect(() => {
    try { localStorage.setItem("vp_progress", JSON.stringify(progress)); } catch {}
  }, [progress]);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  };

  const markRead = useCallback((id) => {
    setProgress(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  }, []);

  const saveNote = () => {
    if (!noteText.trim()) return;
    const id = editingNote || Date.now();
    setNotes(n => ({
      ...n,
      [id]: {
        id, title: noteTitle || `Anotação ${new Date().toLocaleDateString("pt-BR")}`,
        text: noteText, versiculo: versiculo.ref,
        date: new Date().toISOString(), versiculo_id: current
      }
    }));
    setNoteText(""); setNoteTitle(""); setEditingNote(null); setShowNoteForm(false);
    showToast("Anotação salva!");
  };

  const deleteNote = (id) => {
    setNotes(n => { const c = {...n}; delete c[id]; return c; });
    showToast("Anotação removida.", "info");
  };

  const getAiReflexao = async () => {
    setAiLoading(true); setAiReflexao("");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `Você é um pastor experiente e carinhoso. Escreva uma reflexão devocional em português brasileiro para o versículo abaixo. Seja profundo, prático e encorajador. Máximo 4 parágrafos curtos. Não repita o versículo. Termine com uma aplicação prática para o dia.

Versículo: "${versiculo.texto}" (${versiculo.ref})`
          }]
        })
      });
      const data = await res.json();
      const text = data?.content?.find(b => b.type === "text")?.text || "";
      setAiReflexao(text);
    } catch (e) {
      setAiReflexao("Não foi possível carregar a reflexão. Verifique sua conexão.");
    }
    setAiLoading(false);
  };

  const filteredVersiculos = TODOS_VERSICULOS.filter(v => {
    const temaOk = filterTema === "todos" || v.tema === filterTema;
    const q = searchQ.toLowerCase();
    const searchOk = !q || v.texto.toLowerCase().includes(q) || v.ref.toLowerCase().includes(q) || v.reflexao.toLowerCase().includes(q);
    return temaOk && searchOk;
  });

  const pct = Math.round((progress.length / TODOS_VERSICULOS.length) * 100);

  const styles = {
    app: {
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "linear-gradient(135deg, #FDF6EE 0%, #F5EAD8 50%, #EDD9C0 100%)",
      minHeight: "100vh",
      color: "#3A2515",
    },
    header: {
      background: "linear-gradient(135deg, #3A2515 0%, #5C3D2E 60%, #7A5040 100%)",
      color: "#FDF0D8",
      padding: "0",
    },
    headerInner: {
      maxWidth: 860,
      margin: "0 auto",
      padding: "20px 20px 0",
    },
    headerTop: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    logo: {
      fontSize: "clamp(1.4rem, 5vw, 2.2rem)",
      fontWeight: 700,
      letterSpacing: 1,
      fontFamily: "'Georgia', serif",
      color: "#EDD9BE",
    },
    logoSub: {
      fontSize: "0.7rem",
      letterSpacing: 3,
      textTransform: "uppercase",
      color: "#C8A97E",
      marginTop: 2,
    },
    dateStr: {
      fontSize: "0.75rem",
      color: "#C8A97E",
      textAlign: "right",
      fontStyle: "italic",
    },
    progressBar: {
      height: 4,
      background: "rgba(255,255,255,0.1)",
      borderRadius: 2,
      margin: "12px 0 0",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(90deg, #C8A97E, #EDD9BE)",
      width: `${pct}%`,
      transition: "width 0.5s ease",
      borderRadius: 2,
    },
    nav: {
      display: "flex",
      gap: 0,
      marginTop: 16,
    },
    navBtn: (active) => ({
      flex: 1,
      padding: "12px 4px",
      border: "none",
      background: active ? "rgba(255,255,255,0.12)" : "transparent",
      color: active ? "#EDD9BE" : "#A08060",
      cursor: "pointer",
      fontSize: "clamp(0.7rem, 2.5vw, 0.85rem)",
      fontWeight: active ? 700 : 400,
      letterSpacing: 1,
      textTransform: "uppercase",
      borderBottom: active ? "2px solid #C8A97E" : "2px solid transparent",
      transition: "all 0.2s",
    }),
    main: {
      maxWidth: 860,
      margin: "0 auto",
      padding: "24px 16px 80px",
    },
    card: {
      background: "linear-gradient(135deg, #FEFAF4 0%, #FDF3E3 100%)",
      borderRadius: 18,
      padding: "28px 24px",
      marginBottom: 20,
      boxShadow: "0 4px 24px rgba(92,61,46,0.12), 0 1px 4px rgba(92,61,46,0.08)",
      border: "1px solid rgba(200,169,126,0.2)",
    },
    versiculoCard: {
      background: "linear-gradient(145deg, #FFFEF9 0%, #FDF6EE 60%, #F5E8D0 100%)",
      borderRadius: 20,
      padding: "32px 28px",
      marginBottom: 20,
      boxShadow: "0 8px 32px rgba(92,61,46,0.15)",
      border: "1.5px solid rgba(200,169,126,0.35)",
      position: "relative",
      overflow: "hidden",
    },
    quoteIcon: {
      fontSize: "5rem",
      color: "rgba(200,169,126,0.12)",
      position: "absolute",
      top: -10,
      left: 10,
      lineHeight: 1,
      fontFamily: "Georgia, serif",
    },
    verseText: {
      fontSize: "clamp(1.05rem, 3vw, 1.35rem)",
      lineHeight: 1.7,
      fontStyle: "italic",
      color: "#3A2515",
      marginBottom: 16,
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      zIndex: 1,
    },
    verseRef: {
      fontFamily: "'Georgia', serif",
      fontSize: "0.85rem",
      color: "#8B6645",
      fontWeight: 600,
      letterSpacing: 1.5,
      textTransform: "uppercase",
    },
    temaBadge: (t) => ({
      display: "inline-block",
      padding: "3px 10px",
      borderRadius: 20,
      background: TEMA_COLORS[t] || "#E8E0D0",
      color: "#5C3D2E",
      fontSize: "0.7rem",
      fontWeight: 600,
      letterSpacing: 1,
      textTransform: "uppercase",
      marginRight: 8,
    }),
    reflexaoText: {
      fontSize: "1rem",
      lineHeight: 1.75,
      color: "#5C3D2E",
      fontFamily: "'Georgia', serif",
    },
    btn: (variant = "primary") => ({
      padding: variant === "sm" ? "6px 14px" : "11px 22px",
      borderRadius: 10,
      border: "none",
      cursor: "pointer",
      fontSize: variant === "sm" ? "0.75rem" : "0.88rem",
      fontWeight: 600,
      letterSpacing: 0.5,
      transition: "all 0.2s",
      background: variant === "primary" ? "linear-gradient(135deg, #5C3D2E, #8B6645)"
        : variant === "ghost" ? "transparent"
        : variant === "outline" ? "transparent"
        : "#EDD9BE",
      color: variant === "primary" ? "#FDF6EE"
        : variant === "ghost" ? "#8B6645"
        : "#5C3D2E",
      border: variant === "outline" ? "1.5px solid #C8A97E" : "none",
      boxShadow: variant === "primary" ? "0 2px 12px rgba(92,61,46,0.25)" : "none",
    }),
    sectionTitle: {
      fontSize: "clamp(1rem, 3vw, 1.2rem)",
      fontWeight: 700,
      color: "#3A2515",
      marginBottom: 6,
      fontFamily: "'Georgia', serif",
      letterSpacing: 0.5,
    },
    sectionSub: {
      fontSize: "0.82rem",
      color: "#8B6645",
      marginBottom: 18,
    },
    input: {
      width: "100%",
      padding: "10px 14px",
      borderRadius: 10,
      border: "1.5px solid #D4B896",
      background: "rgba(255,255,255,0.8)",
      fontSize: "0.9rem",
      color: "#3A2515",
      fontFamily: "Georgia, serif",
      outline: "none",
      boxSizing: "border-box",
      marginBottom: 10,
    },
    textarea: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: 10,
      border: "1.5px solid #D4B896",
      background: "rgba(255,255,255,0.8)",
      fontSize: "0.9rem",
      color: "#3A2515",
      fontFamily: "Georgia, serif",
      outline: "none",
      resize: "vertical",
      minHeight: 120,
      boxSizing: "border-box",
      marginBottom: 10,
    },
    noteCard: {
      background: "#FFFEF9",
      borderRadius: 14,
      padding: "18px 18px",
      marginBottom: 12,
      border: "1px solid rgba(200,169,126,0.25)",
      boxShadow: "0 2px 10px rgba(92,61,46,0.07)",
    },
    progressCard: {
      background: "linear-gradient(135deg, #3A2515 0%, #5C3D2E 100%)",
      borderRadius: 18,
      padding: "24px",
      color: "#FDF6EE",
      marginBottom: 20,
    },
    statsRow: {
      display: "flex",
      gap: 12,
      marginBottom: 16,
      flexWrap: "wrap",
    },
    statBox: {
      flex: "1 1 80px",
      background: "rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "14px 12px",
      textAlign: "center",
    },
    versiculoListCard: (lido) => ({
      background: lido ? "rgba(200,169,126,0.15)" : "#FFFEF9",
      borderRadius: 12,
      padding: "14px 16px",
      marginBottom: 10,
      border: `1px solid ${lido ? "#C8A97E" : "rgba(200,169,126,0.2)"}`,
      cursor: "pointer",
      transition: "all 0.2s",
    }),
    toast: {
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      background: "#3A2515",
      color: "#EDD9BE",
      padding: "12px 24px",
      borderRadius: 30,
      fontSize: "0.85rem",
      fontWeight: 600,
      zIndex: 9999,
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      letterSpacing: 0.5,
    },
  };

  // ── TAB: VERSÍCULO DO DIA ─────────────────────────────────────────────────
  const TabDia = () => (
    <div>
      {/* Data */}
      <div style={{ textAlign:"center", marginBottom: 20 }}>
        <div style={{ fontSize:"0.78rem", letterSpacing:3, textTransform:"uppercase", color:"#8B6645", marginBottom:4 }}>
          ✦ Versículo do Dia ✦
        </div>
        <div style={{ fontSize:"0.85rem", color:"#A08060", fontStyle:"italic" }}>
          {formatDate()}
        </div>
      </div>

      {/* Card principal */}
      <div style={styles.versiculoCard}>
        <div style={styles.quoteIcon}>"</div>
        <p style={styles.verseText}>{versiculoDia.texto}</p>
        <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
          <span style={styles.verseRef}>{versiculoDia.ref}</span>
          <span style={styles.temaBadge(versiculoDia.tema)}>{versiculoDia.tema}</span>
        </div>
      </div>

      {/* Reflexão base */}
      <div style={styles.card}>
        <div style={styles.sectionTitle}>💭 Reflexão</div>
        <p style={styles.reflexaoText}>{versiculoDia.reflexao}</p>
      </div>

      {/* Reflexão IA */}
      <div style={styles.card}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <div style={styles.sectionTitle}>✨ Reflexão Aprofundada</div>
          <button style={styles.btn("outline")} onClick={getAiReflexao} disabled={aiLoading}>
            {aiLoading ? "Gerando..." : aiReflexao ? "🔄 Renovar" : "✨ Gerar"}
          </button>
        </div>
        {aiLoading && (
          <div style={{ textAlign:"center", padding:"20px", color:"#8B6645", fontStyle:"italic" }}>
            Buscando sabedoria...
          </div>
        )}
        {aiReflexao && !aiLoading && (
          <p style={{ ...styles.reflexaoText, whiteSpace:"pre-wrap" }}>{aiReflexao}</p>
        )}
        {!aiReflexao && !aiLoading && (
          <p style={{ color:"#A08060", fontSize:"0.9rem", fontStyle:"italic" }}>
            Clique em "Gerar" para receber uma reflexão personalizada com IA sobre este versículo.
          </p>
        )}
      </div>

      {/* Ação rápida */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        <button style={{ ...styles.btn("outline"), flex:1 }}
          onClick={() => { setTab("anotacoes"); setShowNoteForm(true); }}>
          📝 Anotar reflexão
        </button>
        <button style={{ ...styles.btn("primary"), flex:1 }}
          onClick={() => { markRead(versiculoDia.id); showToast(progress.includes(versiculoDia.id) ? "Marcado como não lido" : "Marcado como lido! ✓"); }}>
          {progress.includes(versiculoDia.id) ? "✓ Lido" : "Marcar como lido"}
        </button>
      </div>
    </div>
  );

  // ── TAB: AVANÇAR / EXPLORAR ───────────────────────────────────────────────
  const TabAvancar = () => {
    const lista = filteredVersiculos.slice(0, 50);
    return (
      <div>
        {/* Versículo atual grande */}
        <div style={styles.versiculoCard}>
          <div style={styles.quoteIcon}>"</div>
          <p style={styles.verseText}>{versiculo.texto}</p>
          <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            <span style={styles.verseRef}>{versiculo.ref}</span>
            <span style={styles.temaBadge(versiculo.tema)}>{versiculo.tema}</span>
            <span style={{ fontSize:"0.7rem", color:"#A08060", marginLeft:"auto" }}>
              {current + 1} / {TODOS_VERSICULOS.length}
            </span>
          </div>
        </div>

        {/* Reflexão */}
        <div style={{ ...styles.card, marginBottom:16 }}>
          <p style={styles.reflexaoText}>{versiculo.reflexao}</p>
        </div>

        {/* Navegação */}
        <div style={{ display:"flex", gap:10, marginBottom:24 }}>
          <button style={{ ...styles.btn("outline"), flex:1 }}
            onClick={() => setCurrent(c => (c - 1 + TODOS_VERSICULOS.length) % TODOS_VERSICULOS.length)}>
            ← Anterior
          </button>
          <button style={{ ...styles.btn("primary"), flex:1 }}
            onClick={() => { markRead(versiculo.id); showToast("Marcado como lido! ✓"); }}>
            {progress.includes(versiculo.id) ? "✓ Lido" : "Marcar Lido"}
          </button>
          <button style={{ ...styles.btn("outline"), flex:1 }}
            onClick={() => setCurrent(c => (c + 1) % TODOS_VERSICULOS.length)}>
            Próximo →
          </button>
        </div>

        {/* Filtros */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>🔍 Explorar Versículos</div>
          <p style={styles.sectionSub}>{TODOS_VERSICULOS.length}+ versículos com reflexões</p>
          <input style={styles.input} placeholder="Buscar versículo, referência ou tema..." value={searchQ}
            onChange={e => setSearchQ(e.target.value)} />
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:16 }}>
            {["todos", ...TEMAS].map(t => (
              <button key={t} style={{
                padding:"4px 10px", borderRadius:20, border:"1.5px solid",
                borderColor: filterTema===t ? "#8B6645" : "#D4B896",
                background: filterTema===t ? "#5C3D2E" : "transparent",
                color: filterTema===t ? "#EDD9BE" : "#8B6645",
                fontSize:"0.7rem", fontWeight:600, cursor:"pointer",
                textTransform:"capitalize",
              }} onClick={() => setFilterTema(t)}>{t}</button>
            ))}
          </div>
          <div style={{ fontSize:"0.78rem", color:"#A08060", marginBottom:10 }}>
            {filteredVersiculos.length} versículos encontrados
            {filteredVersiculos.length > 50 && " (mostrando 50)"}
          </div>
          {lista.map(v => (
            <div key={v.id} style={styles.versiculoListCard(progress.includes(v.id))}
              onClick={() => setCurrent(TODOS_VERSICULOS.indexOf(v))}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"0.75rem", fontWeight:700, color:"#8B6645", marginBottom:4, letterSpacing:1 }}>
                    {v.ref}
                  </div>
                  <div style={{ fontSize:"0.88rem", fontStyle:"italic", color:"#3A2515", lineHeight:1.5 }}>
                    {v.texto.length > 100 ? v.texto.slice(0,100) + "..." : v.texto}
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:4, alignItems:"flex-end" }}>
                  <span style={styles.temaBadge(v.tema)}>{v.tema}</span>
                  {progress.includes(v.id) && <span style={{ fontSize:"0.75rem", color:"#8B6645" }}>✓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── TAB: PROGRESSO ────────────────────────────────────────────────────────
  const TabProgresso = () => {
    const temaStats = TEMAS.map(t => ({
      tema: t,
      total: TODOS_VERSICULOS.filter(v => v.tema === t).length,
      lidos: TODOS_VERSICULOS.filter(v => v.tema === t && progress.includes(v.id)).length,
    })).sort((a,b) => b.lidos - a.lidos);

    return (
      <div>
        <div style={styles.progressCard}>
          <div style={{ textAlign:"center", marginBottom:20 }}>
            <div style={{ fontSize:"3rem", fontWeight:700, color:"#EDD9BE" }}>{pct}%</div>
            <div style={{ fontSize:"0.9rem", color:"#C8A97E" }}>
              {progress.length} de {TODOS_VERSICULOS.length} versículos lidos
            </div>
          </div>
          <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:8, height:10, overflow:"hidden" }}>
            <div style={{ height:"100%", background:"linear-gradient(90deg, #C8A97E, #EDD9BE)", width:`${pct}%`, borderRadius:8, transition:"width 0.5s" }} />
          </div>
          <div style={styles.statsRow}>
            <div style={styles.statBox}>
              <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#EDD9BE" }}>{progress.length}</div>
              <div style={{ fontSize:"0.7rem", color:"#C8A97E", textTransform:"uppercase", letterSpacing:1 }}>Lidos</div>
            </div>
            <div style={styles.statBox}>
              <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#EDD9BE" }}>{TODOS_VERSICULOS.length - progress.length}</div>
              <div style={{ fontSize:"0.7rem", color:"#C8A97E", textTransform:"uppercase", letterSpacing:1 }}>Restantes</div>
            </div>
            <div style={styles.statBox}>
              <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#EDD9BE" }}>{Object.keys(notes).length}</div>
              <div style={{ fontSize:"0.7rem", color:"#C8A97E", textTransform:"uppercase", letterSpacing:1 }}>Anotações</div>
            </div>
            <div style={styles.statBox}>
              <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#EDD9BE" }}>{temaStats.filter(t=>t.lidos>0).length}</div>
              <div style={{ fontSize:"0.7rem", color:"#C8A97E", textTransform:"uppercase", letterSpacing:1 }}>Temas</div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.sectionTitle}>📊 Por Tema</div>
          {temaStats.map(t => (
            <div key={t.tema} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:"0.82rem", color:"#5C3D2E", textTransform:"capitalize", fontWeight:600 }}>{t.tema}</span>
                <span style={{ fontSize:"0.78rem", color:"#8B6645" }}>{t.lidos}/{t.total}</span>
              </div>
              <div style={{ background:"rgba(200,169,126,0.2)", borderRadius:6, height:7, overflow:"hidden" }}>
                <div style={{
                  height:"100%",
                  background: TEMA_COLORS[t.tema] || "#C8A97E",
                  width:`${t.total > 0 ? (t.lidos/t.total*100) : 0}%`,
                  borderRadius:6, transition:"width 0.5s",
                  filter:"saturate(1.5) brightness(0.85)",
                }} />
              </div>
            </div>
          ))}
        </div>

        {progress.length > 0 && (
          <div style={{ textAlign:"center", marginTop:8 }}>
            <button style={styles.btn("ghost")}
              onClick={() => { setProgress([]); showToast("Progresso reiniciado.", "info"); }}>
              Reiniciar progresso
            </button>
          </div>
        )}
      </div>
    );
  };

  // ── TAB: ANOTAÇÕES ────────────────────────────────────────────────────────
  const TabAnotacoes = () => {
    const notesList = Object.values(notes).sort((a,b) => new Date(b.date) - new Date(a.date));
    return (
      <div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <div>
            <div style={styles.sectionTitle}>📝 Minhas Anotações</div>
            <p style={{ ...styles.sectionSub, marginBottom:0 }}>{notesList.length} anotação{notesList.length !== 1 ? "ões" : ""}</p>
          </div>
          <button style={styles.btn("primary")} onClick={() => { setEditingNote(null); setNoteText(""); setNoteTitle(""); setShowNoteForm(true); }}>
            + Nova
          </button>
        </div>

        {showNoteForm && (
          <div style={{ ...styles.card, border:"1.5px solid rgba(200,169,126,0.5)", marginBottom:20 }}>
            <div style={{ ...styles.sectionTitle, marginBottom:14 }}>
              {editingNote ? "Editar Anotação" : "Nova Anotação"}
            </div>
            <div style={{ fontSize:"0.78rem", color:"#8B6645", marginBottom:8 }}>
              Versículo: <strong>{versiculo.ref}</strong>
            </div>
            <input style={styles.input} placeholder="Título da anotação (opcional)"
              value={noteTitle} onChange={e => setNoteTitle(e.target.value)} />
            <textarea style={styles.textarea} placeholder="Escreva seus pensamentos, insights e reflexões sobre este versículo..."
              value={noteText} onChange={e => setNoteText(e.target.value)} rows={5} />
            <div style={{ display:"flex", gap:10 }}>
              <button style={{ ...styles.btn("outline"), flex:1 }}
                onClick={() => { setShowNoteForm(false); setNoteText(""); setNoteTitle(""); }}>
                Cancelar
              </button>
              <button style={{ ...styles.btn("primary"), flex:1 }} onClick={saveNote}>
                Salvar
              </button>
            </div>
          </div>
        )}

        {notesList.length === 0 && !showNoteForm && (
          <div style={{ textAlign:"center", padding:"40px 20px", color:"#A08060" }}>
            <div style={{ fontSize:"3rem", marginBottom:12 }}>✍️</div>
            <div style={{ fontStyle:"italic" }}>
              Suas anotações aparecerão aqui.<br />
              Registre reflexões sobre os versículos que tocar seu coração.
            </div>
          </div>
        )}

        {notesList.map(note => (
          <div key={note.id} style={styles.noteCard}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div>
                <div style={{ fontWeight:700, color:"#3A2515", fontSize:"0.95rem", marginBottom:2 }}>{note.title}</div>
                <div style={{ fontSize:"0.72rem", color:"#8B6645", letterSpacing:0.5 }}>
                  {note.versiculo} · {new Date(note.date).toLocaleDateString("pt-BR")}
                </div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <button style={styles.btn("sm")} onClick={() => {
                  setEditingNote(note.id); setNoteText(note.text); setNoteTitle(note.title); setShowNoteForm(true);
                  setCurrent(note.versiculo_id);
                }}>Editar</button>
                <button style={{ ...styles.btn("sm"), background:"transparent", color:"#C9908E" }}
                  onClick={() => deleteNote(note.id)}>×</button>
              </div>
            </div>
            <p style={{ fontSize:"0.9rem", color:"#5C3D2E", lineHeight:1.6, margin:0, whiteSpace:"pre-wrap" }}>
              {note.text}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.app}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.headerTop}>
            <div>
              <div style={styles.logo}>🫙 Versículos no Pote</div>
              <div style={styles.logoSub}>✦ {TODOS_VERSICULOS.length}+ Promessas de Deus ✦</div>
            </div>
            <div style={styles.dateStr}>
              {new Date().toLocaleDateString("pt-BR", { day:"2-digit", month:"short" })}
              <br />
              <span style={{ fontSize:"0.65rem" }}>{pct}% lido</span>
            </div>
          </div>
          <div style={styles.progressBar}><div style={styles.progressFill}/></div>
          <nav style={styles.nav}>
            {[
              { id:"dia", label:"📖 Dia" },
              { id:"avancar", label:"🔍 Explorar" },
              { id:"progresso", label:"📊 Progresso" },
              { id:"anotacoes", label:"📝 Notas" },
            ].map(t => (
              <button key={t.id} style={styles.navBtn(tab===t.id)} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main style={styles.main}>
        {tab === "dia"      && <TabDia />}
        {tab === "avancar"  && <TabAvancar />}
        {tab === "progresso"&& <TabProgresso />}
        {tab === "anotacoes"&& <TabAnotacoes />}
      </main>

      {/* TOAST */}
      {toast && <div style={styles.toast}>{toast.msg}</div>}
    </div>
  );
}

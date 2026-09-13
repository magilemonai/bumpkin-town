export const PHASES = ['Roots & Routines','Applied Nonsense','The Familiar Impossible'];
export const CROPS = {
  squash:{name:'Cogsquash',short:'Squash',icon:'✺',color:'#eab554',sprite:8,phase:1,seed:3,sell:6,grow:100,desc:'A scalloped squash with excellent mechanical potential.'},
  bean:{name:'Springbean',short:'Bean',icon:'❧',color:'#80a34a',sprite:9,phase:1,seed:4,sell:8,grow:140,desc:'The tendrils remember every shape you bend them into.'},
  gourd:{name:'Bellowsgourd',short:'Gourd',icon:'♧',color:'#c89252',sprite:10,phase:1,seed:5,sell:10,grow:180,desc:'Hollow inside. Quite a good listener.'},
  reed:{name:'Wirereed',short:'Reed',icon:'♒',color:'#8aab71',sprite:11,phase:1,seed:4,sell:8,grow:160,wet:true,desc:'Creek-bed only. Twine today, impossible thread eventually.'},
  onion:{name:'Lanternonion',short:'Onion',icon:'☼',color:'#e4a645',sprite:12,phase:2,seed:8,sell:18,grow:220,desc:'Optical layers. Makes you cry in very high resolution.'},
  loft:{name:'Loftweed',short:'Loftweed',icon:'❋',color:'#eae2c3',sprite:13,phase:3,seed:12,sell:28,grow:260,desc:'The fluff falls up. The gardening advice does not cover this.'}
};
export const ITEMS = {
  wood:{name:'Wood',icon:'▰',sell:2},stone:{name:'Stone',icon:'◆',sell:2},clay:{name:'Creek clay',icon:'◒',sell:3},scrap:{name:'Salvaged copper',icon:'⚙',sell:7,buy:15},glass:{name:'Bottle glass',icon:'◇',sell:6,buy:12},
  gear:{name:'Squash gears',icon:'⚙',sell:15},ceramic:{name:'Ceramic parts',icon:'◈',sell:18},twine:{name:'Reed twine',icon:'⌘',sell:14},spring:{name:'Bean springs',icon:'〰',sell:22},lens:{name:'Onion lenses',icon:'◎',sell:38},lift:{name:'Lift bales',icon:'▱',sell:60},thread:{name:'Sky thread',icon:'✧',sell:65},...Object.fromEntries(Object.entries(CROPS).map(([id,c])=>[id,{name:c.name,icon:c.icon,sell:c.sell}]))
};
export const RESEARCH = [
  {id:'soil',phase:1,name:'A feel for the soil',desc:'Keep a seed from every harvest. Your first small independence.',cost:{wood:8,stone:4,squash:6},requires:[],effect:'Harvests return a seed.'},
  {id:'mill',phase:1,name:'Squash mill',desc:'Jun insists that the gear teeth were the squash’s idea.',cost:{wood:15,stone:8,squash:6},requires:['soil'],effect:'Press cogsquash into gears.'},
  {id:'kiln',phase:1,name:'Gourd-bellows kiln',desc:'A repaired family kiln. One leg came from a dining table.',cost:{stone:16,clay:8,gourd:6},requires:['mill'],effect:'Fire clay into ceramic parts.'},
  {id:'loom',phase:1,name:'Reed spool',desc:'A little thread can hold a whole town together.',cost:{wood:12,reed:8},requires:['soil'],effect:'Spin wirereed into twine.'},
  {id:'irrigation',phase:1,name:'A sensible sprinkler',desc:'A ceramic pipe, a gourd tank, and one less job before breakfast.',cost:{ceramic:8,twine:6,wood:12},requires:['kiln','loom'],effect:'Every planted bed waters itself.'},
  {id:'crate',phase:1,name:'Room to put things',desc:'Build better beds and crates. The squash appreciate the attention.',cost:{gear:8,twine:4,squash:12},requires:['mill','loom'],effect:'+1 crop per harvest. Open the south field.'},
  {id:'winder',phase:2,name:'Springbean winder',desc:'Its tension comb plays a tune that sounds oddly familiar.',cost:{gear:12,ceramic:10,scrap:10},requires:[],effect:'Wind beans into springs.'},
  {id:'lathe',phase:2,name:'Onion lathe',desc:'Peel a lens so thin you can see next Thursday through it. Almost.',cost:{gear:14,spring:10,glass:6},requires:['winder'],effect:'Turn lanternonions into lenses.'},
  {id:'compost',phase:2,name:'Opinionated compost',desc:'It has strong views on nitrogen and keeps them mostly to itself.',cost:{bean:24,gourd:20,ceramic:12},requires:['winder'],effect:'Crops grow 25% faster.'},
  {id:'tubes',phase:2,name:'Neighbourhood tubes',desc:'A copper circulatory system for the things people keep borrowing.',cost:{spring:18,ceramic:16,twine:12},requires:['lathe'],effect:'Town scavenging yields twice as much.'},
  {id:'harvester',phase:2,name:'Polite mechanical hands',desc:'They knock before picking. Jun is working on the knocking.',cost:{spring:18,lens:12,gear:16},requires:['tubes'],effect:'Ripe crops harvest and replant automatically.'},
  {id:'cooperative',phase:2,name:'The peculiar exchange',desc:'Bea accepts machine parts. Pip accepts squash. Everybody accepts pie.',cost:{squash:30,bean:24,lens:12},requires:['compost','tubes'],effect:'Town orders pay 50% more. +1 crop per harvest.'},
  {id:'baler',phase:3,name:'Ceiling-mounted baler',desc:'Bolt the hay baler upside down. Rate the output in cats.',cost:{gear:20,spring:20,loft:24,twine:12},requires:[],effect:'Make lift bales. The reference cat remains on the ground.'},
  {id:'skyloom',phase:3,name:'A hem in the sky',desc:'Impossible cloth frays just like everything else.',cost:{lens:20,twine:20,loft:20},requires:['baler'],effect:'Spin sky thread; stitch changes into the town.'},
  {id:'stillwater',phase:3,name:'Water with reservations',desc:'The water has agreed to go uphill, provided the route is scenic.',cost:{lift:16,thread:12,ceramic:24},requires:['skyloom'],effect:'Creek beds grow twice as quickly. Scavenge at any hour.'},
  {id:'yesterday',phase:3,name:'Yesterday-light windows',desc:'Keep the diner at six o’clock. Breakfast remains an administrative issue.',cost:{lens:24,spring:20,thread:12},requires:['skyloom'],effect:'Processing is twice as fast.'},
  {id:'seasons',phase:3,name:'Four seasons, one square',desc:'Winter by the pump. Autumn by the bench. Mind the wet leaves.',cost:{lift:16,thread:16,gourd:24},requires:['stillwater','yesterday'],effect:'Every crop yields one more. The square transforms.'},
  {id:'potluck',phase:3,name:'A table long enough',desc:'We have changed the nature of distance. Somebody still needs to set the table.',cost:{squash:36,bean:30,gourd:24,onion:24,loft:24,thread:20},requires:['seasons'],effect:'Prepare the impossible potluck finale.'}
];
export const RECIPES = [
  {id:'gear',name:'Squash mill',research:'mill',input:{squash:2},output:{gear:2},seconds:12,sprite:14},
  {id:'ceramic',name:'Gourd-bellows kiln',research:'kiln',input:{clay:2,gourd:1},output:{ceramic:2},seconds:18,sprite:14},
  {id:'twine',name:'Reed spool',research:'loom',input:{reed:2},output:{twine:2},seconds:10,sprite:15},
  {id:'spring',name:'Springbean winder',research:'winder',input:{bean:2,scrap:1},output:{spring:3},seconds:15,sprite:15},
  {id:'lens',name:'Onion lathe',research:'lathe',input:{onion:2,glass:1},output:{lens:2},seconds:20,sprite:15},
  {id:'lift',name:'Ceiling-mounted baler',research:'baler',input:{loft:2,twine:1},output:{lift:2},seconds:24,sprite:14},
  {id:'thread',name:'Sky loom',research:'skyloom',input:{reed:2,lens:1},output:{thread:2},seconds:22,sprite:15}
];
export const PEOPLE = [
  {id:'mabel',name:'Mabel',role:'Postmistress · retired stage magician',sprite:1,color:'#597e8f',bio:'Toured as The Astonishing May until she inherited the post office. Still palms stamps without noticing. Has not told the town she misses the stage.',gift:'onion',lines:[
    ['Welcome, dear. Your forwarding address arrived before you. Efficient of it.','I used to make doves disappear. Now I mostly make parcels appear. The wrists remember both.','Your aunt mailed herself a recipe every birthday. I have the last one. When you settle in.'],
    ['The tubes are splendid. I sort by destination, weight, and whether the envelope feels dramatic.','One parcel keeps arriving in my left sleeve. I suspect professional courtesy.','Cleo asked me to do a trick at the square. I said I would check my schedule. My schedule is a rubber band.'],
    ['Tomorrow’s letters arrive with yesterday’s stamps. The pigeons have requested a union representative.','I did the show. Only one dove was a letter. The applause was entirely present tense.','Your aunt’s recipe says: put another place at the table. No ingredients. Very like her.']
  ]},
  {id:'jun',name:'Jun',role:'Mechanic · former miniature railway maker',sprite:2,color:'#547d70',bio:'Built museum-scale locomotives until the museum replaced their workshop with an interactive screen. Came here with a loupe, a mug, and a need to make useful things.',gift:'gear',lines:[
    ['The basement key was under the third flowerpot. The first two were decoys for people with short attention spans.','Those ridges on a cogsquash? Gear teeth. I have been waiting for someone else to notice.','I used to build trains that went nowhere, perfectly. Still proud of the perfectly.'],
    ['The winder plays nine notes. A tolerable error. I will leave it in.','The squash mill has never broken. I check it every morning anyway. It is nice to be expected.','If the harvester knocks, please answer. Otherwise it will wait all afternoon.'],
    ['Cleo says the winder plays her radio theme. I must have heard it through the window. Apparently I was listening.','We can fold distance now. I still measure twice.','I built a tiny train for the potluck table. It goes around the gravy. Nobody asked.']
  ]},
  {id:'bea',name:'Bea',role:'Diner keeper · former long-haul cook',sprite:3,color:'#ba654b',bio:'Cooked on a night train for twenty years. Bought the dining car when the route closed. Knows how to feed someone without making them explain why they are hungry.',gift:'squash',lines:[
    ['Boots by the door. Coffee wherever you need it. First bowl is on the house each day.','This car has crossed the country six thousand times. Now it stays here and people come to it.','Cats have formed a queue at the back. The third one is saving a place for a larger cat.'],
    ['The pie conveyor is two seconds faster than carrying a pie. I use those seconds to look out the window.','Pip paid for lunch with a hinge and a very convincing history of the hinge.','I am keeping table four for people who do not want to be efficient at lunch.'],
    ['It is always six in here now. I serve breakfast anyway. People know what they want.','The ketchup needs a spoon. The pie needs a paperweight. Table four is still table four.','I thought stopping the train would make people leave. They keep arriving. Even now that arriving is a little complicated.']
  ]},
  {id:'orson',name:'Orson',role:'Pond keeper · retired surveyor',sprite:4,color:'#82764a',bio:'Measured every boundary in the county. His late husband Ellis tied the knot marking the pond’s highest flood. Orson measures the pond each morning to keep a conversation going.',gift:'reed',lines:[
    ['Pond is down a finger. Boots are up to the ankle. Measurements depend on what you are trying to save.','Ellis tied this knot. Forty-three years of living together and he never trusted my knots. Sensible man.','Take clay from the marked bank. The frogs have already approved the paperwork.'],
    ['The fountain claims a more accurate measurement. Of what, I asked. It gurgled.','I like the pipes. They follow the land. Someone bothered to look.','A number can be perfect and still not tell you where to put your feet.'],
    ['The pond reflects last Tuesday. Ellis would have said it was a good Tuesday.','I am keeping the rope. You can measure something new beside something old.','Water is up three cats. I wrote it in the book. Then I measured it with the rope. Both belong in the book.']
  ]},
  {id:'pip',name:'Pip',role:'Scavenger · object biographer',sprite:5,color:'#ad814c',bio:'Once catalogued objects in a city archive. Left after being asked to discard everything without a known maker. Finds both parts and stories in the town’s scrap yard.',gift:'glass',lines:[
    ['Nothing here is scrap until I have heard its side of the story. After that, some of it is excellent scrap.','Copper in the yard. Glass by the bottles. Take what you need; come back when the piles settle.','I used to catalogue things. The labels got longer and the shelves got smaller.'],
    ['The store will accept springs now. A spring is just a promise with good posture.','That pipe elbow used to be a trumpet. You can tell by its confidence.','I am writing receipts with a little space for where the parts came from. People keep the receipts.'],
    ['I bought tomorrow’s broken toaster. Today’s toaster is taking it personally.','We trade in cats of lift and jars of light. Rent is still mostly squash.','At the exchange, the label now says who fixed it. Finally, a useful sort of provenance.']
  ]},
  {id:'cleo',name:'Cleo',role:'Town clerk · secret radio dramatist',sprite:6,color:'#ba944a',bio:'Stamps permits by day and broadcasts The Captain of Elsewhere by night. Believes nobody listens. Has filled seventeen notebooks with a universe where every minor character gets a name.',gift:'bean',lines:[
    ['Welcome. I have stamped your agricultural intentions. You are legally allowed to become attached to a vegetable.','There is a radio serial at nine. Strictly speaking I have no opinion about it.','If you name a machine, put it on the form. The form has room for feelings on the reverse.'],
    ['Someone whistled the Captain’s theme in the store. I dropped seventeen permits.','The town is changing faster than the forms. I have introduced an “approximately” stamp.','Jun’s winder sounds familiar. Very familiar. I may need to sit down.'],
    ['Jun heard every episode. While making things. They remembered the bridge in episode twelve.','The Captain of Elsewhere is taking a week off. I have a table to help set, here.','I named every extra in the serial. Turns out being heard is a different kind of being named.']
  ]}
];
export const PROJECTS = [
  {id:'pump',phase:1,person:'orson',name:'Water for everyone',requires:'irrigation',cost:{ceramic:10,gear:8,twine:4},text:'Repair the square’s old hand pump. Orson will do the measuring.',after:'The pump works. Orson marks the waterline with the old rope. New water. Same knot.'},
  {id:'lunch',phase:1,person:'bea',name:'The first shared lunch',requires:'crate',cost:{squash:18,gourd:12},text:'Bea has the recipe. You have the ingredients. The cats have reservations.',after:'At the diner, somebody moves their coat so you can sit down. You have a regular table now.'},
  {id:'letters',phase:1,person:'mabel',name:'A dependable delivery',requires:'loom',cost:{twine:10,gear:6},text:'Make a sorting rack. Mabel’s missing parcel is probably in her sleeve.',after:'Mabel finds the parcel in her sleeve. She bows. You pretend not to notice the bow.'},
  {id:'conveyor',phase:2,person:'bea',name:'The pie line',requires:'lathe',cost:{lens:16,spring:12,onion:16},text:'Give the diner a pie conveyor and windows that catch the evening.',after:'A pie travels six feet without help. Bea spends the saved moment watching a swallow.'},
  {id:'exchange',phase:2,person:'pip',name:'An exchange of peculiar things',requires:'cooperative',cost:{gear:24,spring:12,ceramic:10},text:'Build an exchange where produce, parts, and their stories all have value.',after:'Pip’s first receipt lists the maker, the mender, and the person who brought it back.'},
  {id:'broadcast',phase:2,person:'cleo',name:'Everybody is listening',requires:'tubes',cost:{ceramic:18,twine:18,lens:10},text:'Connect the post office and the square. Cleo’s serial gets a very local audience.',after:'The square hums the Captain’s theme. Cleo looks at Jun. Jun looks at the winder. Neither looks away for long.'},
  {id:'pond',phase:3,person:'orson',name:'Two ways to measure',requires:'stillwater',cost:{lift:20,thread:16,ceramic:20},text:'Float water above the square. Leave room for Orson’s rope.',after:'The new gauge reads in cats. Beside it hangs a knotted rope. Orson enters both numbers.'},
  {id:'show',phase:3,person:'mabel',name:'The Astonishing May returns',requires:'yesterday',cost:{lens:24,thread:18,lift:12},text:'Make a little stage of yesterday-light. The performer knows her own name.',after:'Mabel steps into the light. The first trick is ordinary sleight of hand. The applause arrives exactly on time.'},
  {id:'table',phase:3,person:'jun',name:'A place for everybody',requires:'potluck',cost:{gear:24,lift:24,thread:20,squash:30},text:'Finish the long table. Everybody brings something. Even the table brings something.',after:'The table unfolds across the square. Jun’s tiny railway circles the gravy. The last chair is yours.'}
];
export const ORDERS = [
  {person:'bea',item:'squash',count:8,pay:72,line:'Eight squash. The pie tin believes in you.'},
  {person:'cleo',item:'bean',count:6,pay:72,line:'Props for an extremely small space opera.'},
  {person:'orson',item:'reed',count:6,pay:72,line:'New measuring rope. The old one stays.'},
  {person:'pip',item:'gourd',count:6,pay:90,line:'Six gourds, no questions about acoustics.'},
  {person:'jun',item:'gear',count:8,pay:160,line:'The locomotive is for personal reasons.'},
  {person:'mabel',item:'onion',count:6,pay:150,line:'Stage lighting. Merely in case.'},
  {person:'bea',item:'loft',count:6,pay:220,line:'The soufflé wants to see the ceiling.'}
];
export const STORY = [
  {title:'The key under the flowerpot',body:'Your aunt Wren left you a farm, a rather good pair of boots, and a note: “Things grow here. You will too.”\n\nThe basement key is under the third flowerpot. For now, there are brambles to clear and six little beds waiting for something hopeful.'},
  {title:'Applied Nonsense',body:'The hand pump coughs, then runs clear. Someone brings lunch. Someone else brings a parcel that has been missing for eleven years.\n\nJun turns a squash gear between their fingers. “We could make something quite peculiar with this.”\n\nLanternonion seeds arrive at the store. Copper gutters and experimental machinery begin appearing around town.'},
  {title:'The Familiar Impossible',body:'The first bale of loftweed bumps against the basement ceiling. You all look up. Bea puts a lid on the soup.\n\n“Right,” says Cleo, finding a fresh form. “How much does up cost?”\n\nLoftweed seeds are now available. The town starts measuring light, lift, and yesterday. Orson keeps the rope.'}
];

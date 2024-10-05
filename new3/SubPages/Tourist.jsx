/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import MarqueeWithBack from "../Component/MarqueeWithBack";
import Banner from "../Component/Banner";
import Footer from "../Component/Footer";
import '../Css/Tourist.css'; // Import CSS file for styling
// Sample data of popular tourist places
// Sample data of popular tourist places with expanded text
import chittorImage from '../content/img/tourist/chittor_2.jfif';
import kashmirImage from '../content/img/tourist/kashmir_2.jfif';
import tajMahalImage from '../content/img/tourist/tajmahal_2.jpeg';
import chittorImage2 from '../content/img/tourist/chittor_7.jpg';
import kashmirImage2 from '../content/img/tourist/kashmir_4.jfif';
import tajMahalImage2 from '../content/img/tourist/tajmahal_4.jpeg';




const places = [
  {
    name: "Chittorgarh Fort",
    image: chittorImage,
    image2 : chittorImage2,
    description:
      "The serial site, situated in the state of Rajasthan, includes six majestic forts in Chittorgarh; Kumbhalgarh; Sawai Madhopur; Jhalawar; Jaipur, and Jaisalmer. The eclectic architecture of the forts, some up to 20 kilometers in circumference, bears testimony to the power of the Rajput princely states that flourished in the region from the 8th to the 18th centuries. Explore the beautiful palaces and ancient temples, including the famous Vijay Stambha, a tower commemorating the victory of Maharaja Rana Kumbha. This fort is also known for its rich history, breathtaking views, and intricate carvings, making it a must-visit for history enthusiasts and photographers alike. The fort complex, recognized as a UNESCO World Heritage Site, offers a glimpse into the glorious past of Rajasthan, allowing visitors to wander through its vast grounds and soak in the historical significance of each structure.",

    descriptionDetail : `

    <div >
        <div >
            <div >
                <div >
                    <p >The history of Chittor is one of the most stirring chapters in Indian
                        history for it was there that the flower of Rajput chivalry sprang to life and the immense
                        stretch of its sacred walls and ruined palaces relate the saga of innumerable sieges and heroism
                        which has almost become a myth now.</p>
                    <p >
                        Chittorgarh was one of the most fiercely contested seats of power in India. With its formidable
                        fortifications, Bappa Rawal, the legendary founder of the Sisodia dynasty, received Chittor in
                        the middle of the eighth century, as part of the last Solanki princess's dowry. It crowns a
                        seven-mile- long hill, covering 700 acres (280 hectares), with its fortifications, temples,
                        towers and palaces.
                    </p>
                    <p >
                        From the eighth to the 16th century, Bappa Rawal's descendants ruled over an important kingdom
                        called Mewar stretching from Gujarat to Ajmer. But during these eight centuries the seemingly
                        impregnable Chittor was surrounded, overrun, and sacked three times.
                    </p>
                    <p >
                        In 1303 Allauddin khilji, Sultan of Delhi, intrigued by tales of the matchless beauty of
                        Padmini, Rani of Chittor, of her wit and charm, decided to verify this himself. His armies
                        surrounded Chittor, and the sultan sent a message to Rana Rattan Singh, Padmini's husband, to
                        say that he would spare the city if he could meet its famous queen. The compromise finally
                        reached was that the sultan could look upon Padmini's reflection if he came unarmed into the
                        fort. Accordingly, the sultan went up the hill and glimpsed a reflection of the beautiful
                        Padmini standing by a lotus pool. He thanked his host who courteously escorted Allauddin down to
                        the outer gate-where the sultan's men waited in ambush to take the rana hostage.
                    </p>
                    <p >
                        There was consternation in Chittor until Padmini devised a plan. A messenger informed the sultan
                        that the rani would come to him. Dozens of curtained palanquins set off down the hill, each
                        carried by six humble bearers. Once inside the Sultan's camp, four well-armed Rajput warriors
                        leaped out of each palanquin and each lowly palanquin bearer drew a sword.In the ensuing battle,
                        Rana Rattan Singh was rescued-but 7,000 Rajput warriors died. The sultan now attacked Chittor
                        with renewed vigor. Having lost 7,000 of its best warriors, Chittor could not hold out.
                        Surrender was unthinkable. The rani and her entire entourage of women, the wives of generals and
                        soldiers, sent their children into hiding with loyal retainers. They then dressed their wedding
                        fine , slid their farewells, and singing ancient hymns, boldly entered the mahal and performed
                        jauhar.
                    </p>
                    <p >
                        The men, watching with expressionless faces, then donned saffron robes, smeared the holy ashes
                        of their women on their foreheads, flung open the gates of the fort and thundered down the hill
                        into the enemy ranks, to fight to the death.The second sack or shake (sacrifice) of Chittor, by
                        which Rajputs still swear when pledging their word, occurred in 1535, when Sultan Bahadur Shan
                        Of Gujarat attacked the fort.
                    </p>
                    <h3 >Rana
                        Kumbha</h3>

                    <p >
                        Rana Kumbha (1433-68) was a versatile man a brilliant, poet and musician. He built mewar upto a
                        position of assailable military strength building a chain of thirty forts that girdled the
                        kingdom But, perhaps more important was a patron of the arts to rival Lorenzo de Medici, and he
                        made Chittorgarh a dazzling cultural center whose fame spread right across Hindustan.
                    </p>
                    <h3 >Rana
                        Sanga</h3>
                    <p >
                        Rana Sanga (reigned 1509-27) was a warrior and a man of great chivalry and honor reign was
                        marked by a series of continual battles, in course of which he is said to have lost one arm and
                        had been crippled in one leg and received eighty-four wounds on his body. The last of his
                        battles was again Mughal invader, Babur, in 1527. Deserted by one of generals, Rana Sanga was
                        wounded in the battle and shortly after.
                        Rana Sanga
                    </p>
                    <h3 >Maharana Pratap
                    </h3>

                    <p >
                        Over the next half-century, most other Rajput rulers allowed themselves to be wooed the Mughals;
                        Mewar alone held out. In 1567 Emperor Akbar decided to teach it a lesson: he attacked
                        Chittorgarh razed it to the ground. Five years later Maharana Pratap (reigned 1572-97) came to
                        rule Mewar - a king without a capital. He continued to defy Akbar, and in 1576, confronted the
                        imperial armies at Haldighati.
                        The battle ended in a stalemate and Maharana Pratap and his followers withdrew to the craggy
                        hills of Mewar, from where they continued to harrass the Mughals through guerilla warfare for
                        the next twenty years. Maharana Pratap made his descendants vow that they would not sleep on
                        beds, nor live in palaces, nor eat off metal utensils, until Chittorgarh had been regained.In
                        fact, right into the 20th century the maharanas of Mewar continued to place a leaf platter under
                        their regular utensils and a reed mat under their beds in symbolic continuance of this vow.
                    </p>
                    <h3 >Rani
                        Padmawati
                    </h3>
                    <p >
                        In 1303 Allauddin khilji, Sultan of Delhi, intrigued by tales of the matchless beauty of
                        Padmini, Rani of Chittor, of her wit and charm, decided to verify this himself. His armies
                        surrounded Chittor, and the sultan sent a message to Rana Rattan Singh, Padmini's husband, to
                        say that he would spare the city if he could meet its famous queen. The compromise finally
                        reached was that the sultan could look upon Padmini's reflection if he came unarmed into the
                        fort. Accordingly, the sultan went up the hill and glimpsed a reflection of the beautiful
                        Padmini standing by a lotus pool. He thanked his host who courteously escorted Allauddin down to
                        the outer gate-where the sultan's men waited in ambush to take the rana hostage.
                        There was consternation in Chittor until Padmini devised a plan. A messenger informed the sultan
                        that the rani would come to him. Dozens of curtained palanquins set off down the hill, each
                        carried by six humble bearers. Once inside the Sultan's camp, four well-armed Rajput warriors
                        leaped out of each palanquin and each lowly palanquin bearer drew a sword.In the ensuing battle,
                        Rana Rattan Singh was rescued-but 7,000 Rajput warriors died. The sultan now attacked Chittor
                        with renewed vigor. Having lost 7,000 of its best warriors, Chittor could not hold out.
                        Surrender was unthinkable. The rani and her entire entourage of women, the wives of generals and
                        soldiers, sent their children into hiding with loyal retainers. They then dressed their wedding
                        fine , slid their farewells, and singing ancient hymns, boldly entered the mahal and performed
                        jauhar.
                    </p>
                </div>
            </div>
        </div>
    </div>`,

  },
  {
    name: "Kashmir Valley",
    image: kashmirImage,
    image2 : kashmirImage2,
    description:
      "Jammu & Kashmir tourism has been described as a paradise so many times that one feels it is the ultimate homage you could pay to it. The Kashmir Valley, with its lush green landscapes, pristine lakes, and snow-capped mountains, provides a breathtaking backdrop for adventure and relaxation alike. The valley is famous for its breathtaking views of the Himalayas and vibrant flower gardens, making it a dream destination for nature lovers. Visitors can enjoy activities such as trekking, river rafting, and skiing in the winter months. Don't miss the chance to experience the famous Shikara ride on Dal Lake or explore the beautiful gardens of Mughal architecture like Shalimar Bagh and Nishat Bagh. The warm hospitality of the locals and the rich culture of the region, along with its delicious cuisine, make Kashmir an unforgettable destination for travelers seeking both adventure and tranquility.",
      descriptionDetail :`
       <div >
                    <p >Jammu & Kashmir tourism has been described as a paradise so many times
                        that one feels it is the ultimate homage you could pay to it. But somehow, there is a vagueness
                        in it which does not do justice to this part of the country.
                        What is paradise in Jammu & Kashmir? It is its alpine meadows, crystal clear lakes, amber hues
                        of the trees during autumn, boathouses, gondolas, apple orchards and everything else that is a
                        part of its landscape.
                    </p>
                </div>
                 <div >
                    <h3 >Amar
                        Mahal Palace
                    </h3>
                    <p >
                        Amar Mahal Palace is the architectural gem located on the National Highway towards Srinagar.
                        Built like a French Chateau on a hill overlooking the river Tawi, is a beautiful palace of red
                        sand stone which stands amidst most picturesque horizons of Jammu. Once the residential palace
                        of Raja Amar Singh, the palace has been converted into a museum and is looked after by Hari-Tara
                        Charitable Trust. The museum has the golden throne on which Maharaja used to sit, which is made
                        up of 120 kg pure gold. The museum has a gallery of paintings and a library in which about
                        25,000 books on various subjects and disciplines have been presented </p>
                    <h3 >Bahu
                        Fort</h3>
                    <p >
                        Bahu Fort
                        The ancient Bahu Fort in Jammu is believed to be originally built by Raja Bahu Lochan about
                        3,000 years ago. It was refurbished by the Dogra rulers in the 19th century. The fort is a
                        religious place and within its precincts is a temple dedicated to the Hindu goddess Kali, the
                        presiding deity of Jammu. The temple is known locally as the “Bawey Wali Mata temple”. Just
                        beneath the fort is the terraced Bagh-e-Bahu Garden laid in the style of Mughal gardens which
                        affords panoramic view of the Jammu city and underground fish aquarium.
                    </p>
                    <h3 >Akhnoor
                        Fort</h3>
                    <p >
                        Akhnoor Fort
                        The Fort was built during the early 19th century and commands a towering view along the right
                        bank of the Chenab. The present fort was probably started in 1762 AD at the behest of Raja Tegh
                        Singh, as an autonomous principle state. A devastating famine is said to have broken in the
                        country during this time. In order to provide work to his famishing people Raj Tegh Singh
                        started the construction of Akhnoor Fort and Palace on banks of the Chenab River. He supplied
                        food to the workers for 2 years and thus saved the principality His son Alam Singh completed the
                        Akhnoor fort in 1802. On the eastern side, there are steps leading down to the River Chenab.
                        Though constructed in the 18th century, most of the steps are in a good state of preservation.
                        The ghat served as the important spot for performance of religious sites by the people of the
                        region. The turrets or Burj are still intact is called the Kishore Singh Burj after Maharaja
                        Gulab Singh’s father who was a close associate of Guru Gobind Singh the 10th Sikh Guru. There
                        are traces of paintings on the walls of the rooms of the fort.
                    </p>
                    <h3 >Ambaran
                    </h3>
                    <p >
                        Ambaran
                        Ambaran ,also locally known as Pambaran, is a village of Akhnoor tehsil in Jammu district and is
                        said to have been founded by Amba Jagdev Pawar . A scion of Pawar dynasty of Dhar Ujjain which
                        seems to have been the original capital of Akhnoor. It was named Ambari after the family diety
                        Amba, one of the names of goddess Durga. The name got changed gradually into Ambaran. Ambaran is
                        the eighth place in the world, where relics of Buddha have been found in a stupa. Historians are
                        of the opinion that the place might have been an important centre of Buddhism between the 1st
                        and 7th century B.C. A cultural sequence of four historical periods has already been unraveled
                        at Ambaran. It is believed to be the only early Buddhist site in Jammu region. Excavations have
                        unearthed terracotta figures, small sculptures, pottery and brunt brick structures dating back
                        to pre Kushan and post Gupta period.
                    </p>
                </div>

                `

  },
  {
    name: "Taj Mahal",
     image: tajMahalImage,
     image2 : tajMahalImage2,
    description:
      "India is a remarkable tourist destination that offers a plethora of experiences to travelers. The Taj Mahal, one of the wonders of the world, stands as a symbol of love and a testament to the architectural brilliance of the Mughal era. Built by Emperor Shah Jahan in memory of his wife Mumtaz Mahal, this stunning mausoleum is renowned for its intricate marble inlay work and its breathtaking gardens that surround it. Visitors can marvel at the grandeur of this UNESCO World Heritage Site, especially at sunrise and sunset when the marble reflects shades of pink and orange. The Taj Mahal complex also includes beautiful gardens, reflecting pools, and additional structures like the mosque and guest house, all of which are designed with exquisite attention to detail. A visit to the Taj Mahal is more than just sightseeing; it is an emotional journey through history and a celebration of everlasting love.",

      descriptionDetail : `
       <div >
                    <p >The Taj Mahal is located on the right bank of the Yamuna River in a vast
                        Mughal garden that encompasses nearly 17 hectares, in the Agra District in Uttar Pradesh. It was
                        built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal with construction starting
                        in 1632 AD and completed in 1648 AD, with the mosque, the guest house and the main gateway on
                        the south, the outer courtyard and its cloisters were added subsequently and completed in 1653
                        AD. The existence of several historical and Quaranic inscriptions in Arabic script have
                        facilitated setting the chronology of Taj Mahal. For its construction, masons, stone-cutters,
                        inlayers, carvers, painters, calligraphers, dome builders and other artisans were requisitioned
                        from the whole of the empire and also from the Central Asia and Iran. Ustad-Ahmad Lahori was the
                        main architect of the Taj Mahal.</p>
                </div>

                 <div >


                    <p >The Taj Mahal is considered to be the greatest architectural
                        achievement in the whole range of Indo-Islamic architecture. Its recognised architectonic beauty
                        has a rhythmic combination of solids and voids, concave and convex and light shadow; such as
                        arches and domes further increases the aesthetic aspect. The colour combination of lush green
                        scape reddish pathway and blue sky over it show cases the monument in ever changing tints and
                        moods. The relief work in marble and inlay with precious and semi precious stones make it a
                        monument apart. </p>

                    <p >The uniqueness of Taj Mahal lies in some truly remarkable innovations
                        carried out by the horticulture planners and architects of Shah Jahan. One such genius planning
                        is the placing of tomb at one end of the quadripartite garden rather than in the exact centre,
                        which added rich depth and perspective to the distant view of the monument. It is also, one of
                        the best examples of raised tomb variety. The tomb is further raised on a square platform with
                        the four sides of the octagonal base of the minarets extended beyond the square at the corners.
                        The top of the platform is reached through a lateral flight of steps provided in the centre of
                        the southern side. The ground plan of the Taj Mahal is in perfect balance of composition, the
                        octagonal tomb chamber in the centre, encompassed by the portal halls and the four corner rooms.
                        The plan is repeated on the upper floor. The exterior of the tomb is square in plan, with
                        chamfered corners. The large double storied domed chamber, which houses the cenotaphs of Mumtaz
                        Mahal and Shah Jahan, is a perfect octagon in plan. The exquisite octagonal marble lattice
                        screen encircling both cenotaphs is a piece of superb workmanship. It is highly polished and
                        richly decorated with inlay work. The borders of the frames are inlaid with precious stones
                        representing flowers executed with wonderful perfection. The hues and the shades of the stones
                        used to make the leaves and the flowers appear almost real. The cenotaph of Mumtaz Mahal is in
                        perfect centre of the tomb chamber, placed on a rectangular platform decorated with inlaid
                        flower plant motifs. The cenotaph of Shah Jahan is greater than Mumtaz Mahal and installed more
                        than thirty years later by the side of the latter on its west. The upper cenotaphs are only
                        illusory and the real graves are in the lower tomb chamber (crypt), a practice adopted in the
                        imperial Mughal tombs.
                    </p>

                    <p >
                        The four free-standing minarets at the corners of the platform added a hitherto unknown
                        dimension to the Mughal architecture. The four minarets provide not only a kind of spatial
                        reference to the monument but also give a three dimensional effect to the edifice.
                    </p>

                    <p >

                        The most impressive in the Taj Mahal complex next to the tomb, is the main gate which stands
                        majestically in the centre of the southern wall of the forecourt. The gate is flanked on the
                        north front by double arcade galleries. The garden in front of the galleries is subdivided into
                        four quarters by two main walk-ways and each quarters in turn subdivided by the narrower
                        cross-axial walkways, on the Timurid-Persian scheme of the walled in garden. The enclosure walls
                        on the east and west have a pavilion at the centre.
                    </p>

                    <p >
                        The Taj Mahal is a perfect symmetrical planned building, with an emphasis of bilateral symmetry
                        along a central axis on which the main features are placed. The building material used is
                        brick-in-lime mortar veneered with red sandstone and marble and inlay work of precious/semi
                        precious stones. The mosque and the guest house in the Taj Mahal complex are built of red
                        sandstone in contrast to the marble tomb in the centre. Both the buildings have a large platform
                        over the terrace at their front. Both the mosque and the guest house are the identical
                        structures. They have an oblong massive prayer hall consist of three vaulted bays arranged in a
                        row with central dominant portal. The frame of the portal arches and the spandrels are veneered
                        in white marble. The spandrels are filled with flowery arabesques of stone intarsia and the
                        arches bordered with rope molding.</p>
                    <h3 >
                        <b>Criterion (i):</b>
                    </h3>
                    <p >
                        Taj Mahal represents the finest architectural and artistic achievement through perfect harmony
                        and excellent craftsmanship in a whole range of Indo-Islamic sepulchral architecture. It is a
                        masterpiece of architectural style in conception, treatment and execution and has unique
                        aesthetic qualities in balance, symmetry and harmonious blending of various elements.
                    </p>
                    <h3 >
                        <b>Integrity (i):</b>
                    </h3>
                    <p >




                        Integrity is maintained in the intactness of tomb, mosque, guest house, main gate and the whole
                        Taj Mahal complex. The physical fabric is in good condition and structural stability, nature of
                        foundation, verticality of the minarets and other constructional aspects of Taj Mahal have been
                        studied and continue to be monitored. To control the impact of deterioration due for atmospheric
                        pollutants, an air control monitoring station is installed to constantly monitor air quality and
                        control decay factors as they arise. To ensure the protection of the setting, the adequate
                        management and enforcement of regulations in the extended buffer zone is needed. In addition,
                        future development for tourist facilities will need to ensure that the functional and visual
                        integrity of the property is maintained, particularly in the relationship with the Agra Fort.
                    </p>
                    <h3 >
                        <b>Authenticity </b>
                    </h3>
                    <p >




                        The tomb, mosque, guest house, main gate and the overall Taj Mahal complex have maintained the
                        conditions of authenticity at the time of inscription. Although an important amount of repairs
                        and conservation works have been carried out right from the British period in India these have
                        not compromised to the original qualities of the buildings. Future conservation work will need
                        to follow guidelines that ensure that qualities such as form and design continue to be
                        preserved.</p>
                    <h3 >
                        <b>Protection and management requirements</b>
                    </h3>
                    <p >




                        The management of Taj Mahal complex is carried out by the Archaeological Survey of India and the
                        legal protection of the monument and the control over the regulated area around the monument is
                        through the various legislative and regulatory frameworks that have been established, including
                        the Ancient Monument and Archaeological Sites and Remains Act 1958 and Rules 1959 Ancient
                        Monuments and Archaeological Sites and Remains (Amendment and Validation); which is adequate to
                        the overall administration of the property and buffer areas. Additional supplementary laws
                        ensure the protection of the property in terms of development in the surroundings.
                    </p>
                    <p >

                        An area of 10,400 sq km around the Taj Mahal is defined to protect the monument from pollution.
                        The Supreme Court of India in December, 1996, delivered a ruling banning use of coal/coke in
                        industries located in the Taj Trapezium Zone (TTZ) and switching over to natural gas or
                        relocating them outside the TTZ. The TTZ comprises of 40 protected monuments including three
                        World Heritage Sites - Taj Mahal, Agra Fort and Fatehpur Sikri.
                    </p>
                    <p >

                        The fund provided by the federal government is adequate for the buffer areas. The fund provided
                        by the federal government is adequate for the overall conservation, preservation and maintenance
                        of the complex to supervise activities at the site under the guidance of the Superintending
                        Archaeologist of the Agra Circle. The implementation of an Integrated Management plan is
                        necessary to ensure that the property maintains the existing conditions, particularly in the
                        light of significant pressures derived from visitation that will need to be adequately managed.
                        The Management plan should also prescribe adequate guidelines for proposed infrastructure
                        development and establish a comprehensive Public Use plan.

                    </p>

                </div>


      `
  },

  // Add more places as needed
];


const Tourist = () => {
  const navigate = useNavigate();

  // Function to navigate to the place detail page
  const handleImageClick = (place) => {
    navigate(`/place/${place.name.toLowerCase().replace(/\s+/g, '-')}`, { state: place });
  };

  return (
    <>
      <MarqueeWithBack />
      <Banner />
      <h1 className="tourist-heading"
        onContextMenu={(e) => e.preventDefault()}>
        Tourist Places
      </h1>

      <div
        className="tourist-container"
        onContextMenu={(e) => e.preventDefault()}
      >
        {places.map((place, index) => (
          <div
            key={index}
            className={`place-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            {/* Title at the top */}

            {index % 2 === 0 ? ( // Image on left for even index
              <>
                <div className="DataTouristAllInfo">
                  <h2
                    className="place-title"
                    onClick={() => handleImageClick(place)}
                  >
                    {place.name}{' '}
                  </h2>
                  <div className="DataTouristInfo">
                    <img
                      alt={place.name}
                      src={place.image}
                      className="place-image"
                      onClick={() => handleImageClick(place)}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    <div className="place-content">
                      <p
                        className="place-description"
                        onClick={() => handleImageClick(place)}
                      >
                        {place.description}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Image on right for odd index
              <>
                <div className="DataTouristAllInfo">
                  <h2
                    className="place-title"
                    onClick={() => handleImageClick(place)}
                  >
                    {place.name}
                  </h2>
                  <div className="DataTouristInfo">
                    <div className="place-content">
                      <p
                        className="place-description"
                        onClick={() => handleImageClick(place)}
                      >
                        {place.description}
                      </p>
                    </div>
                    <img
                      alt={place.name}
                      src={place.image}
                      className="place-image"
                      onClick={() => handleImageClick(place)}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </>
  )
};

export default Tourist;

import Center from "@/components/Layout/Center";
import Footer from "@/components/Basic/Footer";
import Header from "@/components/Basic/Header";
import styled from "styled-components";

const StyledFaq = styled.div`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
text-align:center;
`
const StyledAnswer = styled.div`

`

export default function Faq() {
    return (
        <>
            <Header />
            <StyledFaq>
                <Center>
                    <StyledAnswer>
                        <h2 className="font-bold text-2xl">Procesul de livrare</h2>
                        <p>Iti multumim ca ne vizitezi si asteptam comanda ta pentru a te bucura de o experienta olfactiva si vizuala unice.
                            Inainte de plasarea comenzii, te rugam sa studiezi toate produsele noastre si sa iei decizia cea mai buna pentru tine.
                            Lumanarea parfumata Deluxe e turnata si decorata manual intr-un recipient handmade unic, dar am creat si varianta Classic de lumanare turnata in borcan de sticla cu un design minimalist.  Iti recomandam sa alegi cea mai potrivita varianta de decor care poate sa fie cu plante suculente colorate sau cristale naturale. Apoi studiaza cu atentie descrierea parfumurilor noastre si alege pe cel care te reprezinta cel mai bine. Verifica cosul si mergi mai departe pentru a efectua plata.
                            Pe perioada verii din cauza temperaturilor ridicate, livrarile se fac doar de luni pana miercuri inclusiv. Intarzierea ridicarii comenzii de la curier poate duce la amanarea expunerii produselor noastre la temperaturile specific verii pe perioada weekendului si rezultatul final sa nu fie intocmai cel dorit.
                            Iti multumim!
                        </p>
                    </StyledAnswer>
                    <StyledAnswer>
                        <h2 className="font-bold text-2xl">Procesul de fabricație</h2>
                        <p>Maybee este o companie romaneasca mica dar avem dorinta sa cream produse unice si de calitate.
                            Recipientele lumanarilor Deluxe sunt turnate, finisate si sigilate manual intr-o maniera care sa va asigure confortul visual. Lacul folosit la sigilarea vaselor, este pe baza de apa si folosit si in cazul vaselor de bucatarie. Deci, va puteti simti in siguranta.
                            Folosim ceara de soia de cea mai buna calitate iar timpul de topire este de mai lunga durata decat in cazul altor variante.
                            Parfumurile sunt marca Maybee, create din extracte de uleiuri esentiale combinate atent cu note de vârf, medii și de bază. Proportia parfumului adaugat este de 9%. Asadar vei simti parfumul produselor noastre din momentul deschiderii pachetului si rezista ambiental fara a fi neaparat nevoit sa arzi sau topesti ceara.
                            Sapunul de corp este facut din ingrediente bio si continue lapte de capra. Parfumurile sunt atent combinate si adaugate in proportie de 2.5%. Dupa testarea sapunurilor noastre, s-a ajuns la concluzia ca lasa pielea fina, e cremos si cu un parfum care rezista pe piele pe perioada zilei.
                            Sapunul de fata este facut din ingrediente bio si continue lapte de capra si carbune active vegetal. Am ales sa nu adaugam parfum insa proprietatile acestuia sunt de mare calitate si elimină impuritățile și excesul de sebum, lăsând tenul tău curat și revigorat. Proprietățile sale de detoxifiere absorb delicat toxinele și impuritățile, redându-ți un aspect proaspăt și luminos
                            Iti dorim o experienta cat mai frumoasa cu produsele noastre Maybee.</p>
                    </StyledAnswer>
                    <StyledAnswer>
                        <h2 className="font-bold text-2xl">Politică de confidențialitate</h2>
                        <p>Conform cerințelor Legii nr. 677/2001 pentru protecția persoanelor cu privire la prelucrarea datelor cu caracter personal și libera circulație a acestor date, modificată și completată, Mixed Arts Events SRL are obligația de a administra în condiții de siguranță și numai pentru scopurile specificate, datele personale pe care ni le furnizați despre dumneavoastră.

                            Mixed Arts Events SRL se angajează că folosește datele furnizate de utilizatorii site-ului numai în scopul comunicării cu clienții săi, al confirmării comenzilor și întocmirii facturilor fiscale, și al informării clienților cu privire la funcționarea site-ului și a unor oferte speciale sau promoții ale societății dar numai cu acordul prealabil a clientului. Datele personale se mai utilizează pentru întocmirea AWB-urilor și se transmit astfel firmelor de curierat care efectuează livrarea coletelor și încasarea contravalori în cazul coletelor cu plata la ramburs.

                            Magazinul www.maybee.ro se angajează să păstreze confidențialitatea datelor utilizatorilor conform Legii nr. 677 din 21 noiembrie 2001 pentru protecția persoanelor cu privire la prelucrarea datelor cu caracter personal și libera circulație a acestor date și Legea nr. 506 din 17 noiembrie 2004 privind prelucrarea datelor cu caracter personal și protecția vieții private în sectorul comunicațiilor electronice.

                            Conform Legii nr. 677 din 21 noiembrie 2001, toți utilizatorii beneficiază de dreptul de acces și intervenție asupra datelor personale, de a vă opune preluării datelor personale și să solicitați ștergerea datelor

                            E-mail: mixedarts.events@gmail.com</p>
                    </StyledAnswer>
                    <StyledAnswer>
                        <h2 className="font-bold text-2xl">Termeni și condiții</h2>
                        <p>1. DEFINIȚII:
                            Maybee: - este denumirea comercială al magazinului online al firmei Mixed Arts Events SRL  sediul social în localitatea Timisoara, jud. Timis, Str Cugir 16 având codul de înregistrare fiscală 38795036, înregistrată la Oficiul Registrului Comerțului Timis sub nr. J35/344/02.02.2018, e-mail: mixedarts.events@gmail.com - denumită și Vânzător.
                            Utilizator: - orice persoană fizică care are vârsta de peste 16 ani sau persoană juridică sau orice altă entitate juridică care utilizează vizitează siteul www.maybee.ro.
                            Cumpărător: - persoană fizică care are vârsta de peste 16 ani sau persoană juridică sau orice altă entitate juridică care efectuează o Comandă pe www.maybee.ro..
                            Cont: secțiunea din Site care poate fi accesată cu o adresă de e-mail și o parolă și care permite Cumpărătorului transmiterea Comenzii și care conține informații despre Cumpărător. Cumpărătorul este responsabil și se va asigura că toate informațiile introduse la crearea Contului sunt corecte, complete și actualizate.
                            Coșul meu: - este o secțiune din Cont care permite Cumpărătorului sa adauge bunurile pe care dorește să le achiziționeze la momentul adăugării sau la un moment ulterior.
                            Comandă: - reprezintă un document electronic, generat ca urmare a accesării www.maybee.ro și transmiterea intenției de cumpărare a unor produse prin parcurgerea formularului electronic simplificat COMANDĂ și acceptarea Termenilor și condițiilor Mixed Arts Events SRL.
                            Contract: - reprezintă o Comandă confirmată telefonic sau prin e-mail prin care Mixed Arts Events SRL  este de acord să livreze Comanda iar Cumpărătorul este de acord să achite contravaloarea acestora.
                            Opinie (Review): - este o evaluare scrisă de către Utilizator sau Cumpărător, evaluare redactată pe baza experientei personale și capacității acestuia de a realiza comentarii calitative și de a spune dacă bunul cumpărat respectă sau nu specificațiile menționate de către producător sau vânzător. Review-urile nu apar automat pe site.
                            Utilizare abuzivă: - reprezintă utilizarea siteului www.maybee.ro într-un mod contrar practicilor din domeniul electronic sau a reglementărilor și ale legislației în vigoare sau în orice alt mod care poate produce prejudicii pentru Mixed Arts Events SRL.
                            <br />
                            2. DISPONIBILITATE ȘI PREȚ
                            Produsele și ofertele prezentate pe site sunt disponibile în limita stocului. Prețurile afișate pot fi modificate periodic în funcție de prețul de referință al producătorului sau importatorului. Nu garantăm disponibilitatea pe stoc a produselor pentru promoții și o putem întrerupe sau anula în orice moment fără nici o notificare prealabilă.
                            În cazul în care unul sau mai multe dintre produsele comandate nu se mai afla pe stoc dintr-un motiv oarecare sau dintr-o eroare umană Cumpărătorul va fi înștiințat în acest sens. În unele cazuri, produsul comandat poate fi înlocuit cu unul asemănător dacă Cumpărătorul este de acord cu acest lucru. În cazul în care contravaloarea produsului care nu se mai află în stoc a fost achitat în avans de către Cumpărător și nu dorește înlocuirea produsului cu un alt produs asemănător atunci Mixed Arts Events SRL va anula tranzacția online și va face toate demersurile legale ca Cumpărătorul să-și recupereze bani în cel mai scurt timp posibil.
                            Răspunderea pentru orice deteriorare cauzată produsului, coletului sau pachetului trimis de către Mixed Arts Events SRL, revine societății de curierat sau transportatorului conform legislației în vigoare.
                            Prețurile sunt afișate în Lei (RON) și includ TVA.
                            <br />
                            3. MODALITATE DE PLATĂ
                            Modalități de plată pentru comenzile
                            Online cu card bancar: - Plata se efectuează prin platforma securizată Stripe. Cumpărătorul va fi redirecționat pe o pagină securizată 3D Secure unde poate efectua plata în maximă siguranță.
                            <br />
                            4. MODALITATE DE LIVRARE
                            Pe perioada verii, Mixed Arts Events SRL poate lua decizia de a onora comenzi de luni pana miercuri inclusiv. Livrarile inainte de weekend (joi si vineri) pot duce la amanare pana peste weekend a livrarii si dorim a se evita deteriorarea produselor din ceara sau sapun din cauza tempraturilor ridicate.
                            Livrările se fac numai pe teritoriul României, pentru alte locații vă rugăm să ne contactați prin telefon sau email.
                            <br />
                            5. DREPTUL DE PROPRIETATE INTELECTUALĂ
                            Conținutul adică toate informațiile de pe siteul www.maybee.ro care pot fi vizitate, vizualizate sau altfel accesate prin utilizarea unui echipament electronic incluzând logo-urile, reprezentările stilizate, simbolurile comerciale, imaginile statice, imaginile dinamice, alte texte și sau conținut multimedia prezentate pe Site, sunt proprietatea exclusiva a Mixed Arts Events SRL, acestuia fiindu-i rezervate toate drepturile obținute în acest sens în mod direct sau indirect.
                            Cumpărătorului/Utilizatorului nu îi este permisă copierea, distribuirea, publicarea, transferul către terțe părți, modificarea și/sau altfel alterarea, utilizarea, legarea la, expunerea, includerea oricărui conținut în orice alt context decât cel original.
                            Cumpărătorul/Utilizatorul poate copia, transfera și/sau utiliza conținutul de pe siteul www.maybee.ro numai în scopuri personale sau non-comerciale, numai în cazul în care acestea nu intra în conflict cu prevederile legale.
                            <br />
                            6. PRELUCRAREA DATELOR CU CARACTER PERSONAL
                            Vă rugăm să parcurgeți Politica de Confidențialitate cu privire la prelucrarea datelor cu caracter personal, care face parte din prezentul document electronic.
                            <br />
                            7. FORȚĂ MAJORĂ
                            Forța majoră este evenimentul imprevizibil, în afara controlului părților și care nu poate fi evitat.
                            Astfel nici una din părți nu va fi răspunzătoare pentru neexecutarea obligațiilor sale contractuale, dacă o astfel de neexecutare la termen și/sau în mod corespunzător, total sau parțial este datorata unui eveniment de forță majoră. Dacă în termen de cincisprezece zile de la data producerii forța majoră nu încetează fiecare parte va avea dreptul să notifice celeilalte părți încetarea de plin drept a contractului fără ca vreuna dintre ele sa poată pretinde celeilalte alte daune-interese.
                            <br />
                            8. LEGEA APLICABILA – JURISDICTIA
                            Prezentul contract este supus legilor române în vigoare. Eventualele litigii apărute intre Vânzător și Cumpărător se vor rezolva pe cale amiabilă. În cazul în care acest lucru nu va fi posibil, litigiile vor fi soluționate de instantele judecătorești romîne competente.
                            <br />
                            9. ABUZ
                            Ne-ridicarea/refuzul coletelor comandate sau returnările în mod repetat vor fi considerate abuz, iar firma noastră își rezervă dreptul de a refuza viitoarele comenzi plasate de client. Dacă un client a refuzat un colet în ultimele 30 de zile și lansează o nouă comandă va fi sunat și se va solicita plata în avans (prin card bancar sau transfer bancar) pentru comanda nouă plasată pentru a evita refuzul preluării/ridicării coletului. La a doua acțiune de acest gen a clientului se va factura în plus tariful de livrare tur retur a coletelor deja refuzate și până la achitarea acestor sume nu se vor onora nici comenzile plătite prin card bancar sau virament bancar, respectiv se vor reține din sumele încasate tarifele de transport datorate și se va restituii numai diferența fără să fie onorată comanda.</p>
                    </StyledAnswer>
                </Center>
            </StyledFaq>
            <Footer />
        </>
    )
}
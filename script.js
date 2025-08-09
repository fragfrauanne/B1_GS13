const tasks = [
    { question: "das Haus 1960 bauen", answer: "Das Haut wurde 1960 gebaut. / Das Haus ist 1960 gebaut worden." },
    { question: "die Wohnung frisch renovieren", answer: "Die Wohnung wurde frisch renoviert. / Die Wohnung ist frisch renoviert worden." },
    { question: "Tom am Freitag operieren", answer: "Tom wurde am Freitag operiert. / Tom ist am Freitag operiert worden." },
    { question: "die BRD 1949 gründen", answer: "Die BRD wurde 1949 gegründet. / Die BRD ist 1949 gegründet worden." },
    { question: "die Grenze 1989 öffnen", answer: "Die Grenze wurde 1989 geöffnet. / Die Grenze ist 1989 geöffnet worden." },
    { question: "Berlin im Krieg zerstören", answer: "Berlin wurde im Krieg zerstört. / Berlin ist im Krieg zerstört worden." },
    { question: "nach dem Krieg Deutschland in Zonen teilen", answer: "Nach dem Krieg wurde Deutschland in Zonen geteilt. / Nach dem Krieg ist Deutschland in Zonen geteilt worden." },
    { question: "die Kinder zur Schule bringen", answer: "Die Kinder wurden zur Schule gebracht. / Die Kinder sind zur Schule gebracht worden." },
    { question: "die Firma verkaufen", answer: "Die Firma wurde verkauft. / Die Firma ist verkauft worden." },
    { question: "120 Personen zur Hochzeit einladen", answer: "120 Personen wurden zur Hochzeit eingeladen. / 120 Personen sind zur Hochzeit eingeladen worden." },
    { question: "die Straßenbahn 1881 erfinden", answer: "Die Straßenbahn wurde 1881 erfunden. / Die Straßenbahn ist 1881 erfunden worden." },
    { question: "der Roman in viele Sprachen übersetzen", answer: "Der Roman wurde in viele Sprachen übersetzt. / Der Roman ist in viele Sprachen übersetzt worden." },
    { question: "das Auto stehlen", answer: "Das Auto wurde gestohlen. / Das Auto ist gestohlen worden." },
    { question: "drei Personen bei dem Unfall verletzen", answer: "Drei Personen wurden bei dem Unfall verletzt. / Drei Personen sind bei dem Unfall verletzt worden." },
    { question: "die Polizei informieren", answer: "Die Polizei wurde informiert. / Die Polizei ist informiert worden." },
    { question: "das Paket schon abholen", answer: "Das Paket wurde schon abgeholt. / Das Paket ist schon abgeholt worden." },
    { question: "der Film in vielen Ländern zeigen", answer: "Der Film wurde in vielen Ländern gezeigt. / Der Film ist in vielen Ländern gezeigt worden." },
    { question: "die Präsidentin wiederwählen", answer: "Die Präsidentin wurde wiedergewählt. / Die Präsidentin ist wiedergewählt worden." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);
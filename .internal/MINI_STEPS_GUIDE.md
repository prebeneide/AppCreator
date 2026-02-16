# Mini-Steps Guide - Små Steg (pittelitt mer per steg)

## Prinsipp

**Små steg, men gjør pittelitt mer per steg.** Ikke ekstremt én-linje-per-gang; heller 2–4 relaterte endringer som hører logisk sammen. Fortsatt én logisk "ting" per steg, test etter hvert steg.

## Eksempler på Ekstremt Små Steg

### ❌ Dårlig: For stort steg
"Lage chat interface med alle features"
- Dette er for stort!

### ✅ Bra: Ekstremt små steg
1. Opprett tom fil `ChatScreen.tsx`
2. Legg til basic komponent struktur (export default function)
3. Legg til en View med test tekst
4. Test at filen kompilerer
5. Legg til en Text komponent
6. Test
7. Legg til styling (en property om gangen)
8. Test
9. osv...

## Steg-for-Steg Eksempel: Chat Interface

### Steg 1: Opprett fil
- Bare opprett tom fil
- Test at det kompilerer

### Steg 2: Basic struktur
- Legg til import React
- Legg til export default function
- Return null
- Test

### Steg 3: En View
- Legg til View komponent
- Legg til style prop
- Test

### Steg 4: En Text
- Legg til Text komponent
- Test

### Steg 5: Styling (en property)
- Legg til flex: 1
- Test

### Steg 6: Neste styling property
- Legg til backgroundColor
- Test

### Steg 7: Neste feature
- osv...

## Stegstørrelse (oppdatert)

- **Per steg:** 2–4 relaterte endringer som utgjør én logisk forbedring (f.eks. "safe area + padding" eller "header-seksjon med titel og undertittel").
- **Ikke:** Én linje endring per commit med mindre det er nødvendig for å isolere feil.
- **Ikke:** Store features i ett steg – fortsatt bryt ned store oppgaver.
- **Hvis du er usikker:** Gjør mindre; ved feil er det enklere å rulle tilbake.

## Commit Strategi

- Commit etter hver liten endring som fungerer
- Commit message: "feat(chat): add basic View structure"
- Ikke "feat(chat): add complete chat interface"

## Test Strategi

- Test etter hver endring
- Hvis noe feiler, du vet nøyaktig hva som forårsaket det
- Rollback er enkelt (bare én liten endring)


# Mini-Steps Guide - Ekstremt Små Steg

## Prinsipp

**Gjør så lite som mulig hver gang. Hvis du kan dele det opp mer, gjør det.**

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

## Regel: Hvis du er usikker, gjør mindre

Hvis du tenker "skal jeg gjøre X og Y sammen?" - **NEI, gjør X først, test, så Y.**

## Commit Strategi

- Commit etter hver liten endring som fungerer
- Commit message: "feat(chat): add basic View structure"
- Ikke "feat(chat): add complete chat interface"

## Test Strategi

- Test etter hver endring
- Hvis noe feiler, du vet nøyaktig hva som forårsaket det
- Rollback er enkelt (bare én liten endring)


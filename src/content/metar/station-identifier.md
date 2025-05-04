# Station Identifier

## What is a Station Identifier?

Each weather reporting station is assigned a unique identifier code. In METAR reports, this code appears at the beginning of the report and indicates where the weather observation was taken.

## Format of Station Identifiers

Station identifiers typically consist of four letters or a combination of letters and numbers. The format varies by region:

- **United States**: In the US, station identifiers typically begin with 'K' followed by the three-letter airport code
  - Example: **KBOS** for Boston Logan International Airport
  - Example: **KJFK** for John F. Kennedy International Airport in New York

- **Canada**: Canadian station identifiers typically begin with 'C', followed by a letter indicating the region, followed by two more characters
  - Example: **CYYC** for Calgary International Airport

- **International**: Various other prefixes are used internationally
  - Example: **EGLL** for London Heathrow Airport (UK)
  - Example: **YSSY** for Sydney Airport (Australia)
  - Example: **RJTT** for Tokyo Haneda Airport (Japan)

## ICAO vs. IATA Codes

It's important to note that METAR reports use ICAO (International Civil Aviation Organization) codes, not the IATA (International Air Transport Association) codes that passengers might be more familiar with:

| Airport | ICAO Code (METAR) | IATA Code (Ticket) |
|---------|-------------------|-------------------|
| Los Angeles | KLAX | LAX |
| Chicago O'Hare | KORD | ORD |
| London Heathrow | EGLL | LHR |
| Paris Charles de Gaulle | LFPG | CDG |

## Finding the Station Identifier

When reading a METAR report, the station identifier is always the first element after the word "METAR" (if present). For example:

```
METAR KBOS 151954Z 32005KT 10SM FEW030 BKN100 21/14 A3002 RMK AO2 SLP168 T02060139
```

In this example, **KBOS** is the station identifier for Boston Logan International Airport.

## Why Station Identifiers Matter

Understanding station identifiers allows you to:

1. Know which location the weather data is referring to
2. Search for specific airport weather conditions
3. Compare weather patterns between different locations

Station identifiers are the foundation for understanding METAR reports, as they tell you where the observation was made.
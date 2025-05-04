# Introduction to METAR

METAR (Meteorological Terminal Air Report) is a format for reporting weather information used by pilots, air traffic controllers, and meteorologists. These reports are typically generated hourly at airports and weather stations around the world.

METARs provide crucial weather information including:
- Wind direction and speed
- Visibility
- Precipitation and other weather phenomena
- Cloud cover
- Temperature and dew point
- Barometric pressure

Understanding how to read and interpret METAR codes is essential for aviation professionals and meteorology students.

## METAR Format Example

A typical METAR follows this structure:

```
METAR KBOS 151954Z 32005KT 10SM FEW030 BKN100 21/14 A3002 RMK AO2 SLP168 T02060139
```

This might look complex, but it can be broken down into distinct sections, each with its specific meaning:

| Component | Example | Meaning |
|-----------|---------|---------|
| Station Identifier | KBOS | Boston Logan International Airport |
| Date/Time | 151954Z | 15th day of the month at 19:54 UTC |
| Wind | 32005KT | Wind from 320° at 5 knots |
| Visibility | 10SM | 10 statute miles |
| Weather | (none) | No significant weather |
| Clouds | FEW030 BKN100 | Few clouds at 3,000 feet, broken clouds at 10,000 feet |
| Temperature/Dew Point | 21/14 | Temperature 21°C, dew point 14°C |
| Altimeter | A3002 | Altimeter setting 30.02 inches of mercury |
| Remarks | RMK AO2 SLP168 T02060139 | Additional information |

## Why METARs Matter

METARs are critical for flight safety and planning. They allow pilots to:

1. **Assess current conditions** at departure, en-route, and destination airports
2. **Make go/no-go decisions** based on weather minimums
3. **Plan for fuel requirements** in case of diversions
4. **Anticipate turbulence** and other hazardous conditions

> **Note:** METAR reports are typically issued hourly, but special reports (SPECIs) can be issued when significant changes in weather occur.

![METAR Decoding Process](/public/metar-example.png)

*Image: Visualization of the METAR decoding process*
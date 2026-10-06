---
name: kpi-framework
version: 1.0.0
kind: rostrv2.skill
triggers: [KPI, metric, dashboard, activity metric, performance indicator, OKR]
inputs: [goal, team, company_stage, gtm_motion, data_sources]
outputs: [kpi_framework, metric_map, dashboard_schema]
---
# KPI Framework

## Procedure
1. State the business or team goal in measurable language.
2. Choose 1–3 outcome KPIs that best prove progress toward that goal.
3. Add leading activity metrics that a team can influence weekly.
4. Define every metric: calculation, unit, direction, owner, source system, cadence, and target status.
5. Recommend three to five KPIs per team by default; use fewer for early-stage companies.
6. Identify data gaps and instrumentation required.

## Output contract
Return: goal alignment, KPI, activity metrics, definition, formula, source, frequency, owner, target, caveats, and dashboard grouping.

## Constraints
Do not provide financial forecasts. Avoid vanity metrics unless explicitly requested. Clearly label proposed benchmarks versus evidence-backed benchmarks.

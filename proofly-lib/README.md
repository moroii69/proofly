# Proofly

Enterprise-grade health metrics analysis and prediction engine for healthcare applications. Proofly empowers healthcare applications with advanced analytics and predictive capabilities, focusing on chronic conditions including diabetes, hypertension, COPD, and more.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Quick Start](#quick-start)
- [Usage Guide](#usage-guide)
  - [Supported Health Conditions](#supported-health-conditions)
  - [Exporting Results](#exporting-results)
  - [Error Handling](#error-handling)
- [License](#license)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

## Features
- Comprehensive health scoring with evidence-based algorithms
- Multi-factor risk stratification
- Time-series health data processing
- Smart clinical recommendations
- HIPAA-compliant data handling
- Extensive error handling and validation
- Export capabilities for reports and analysis

## Installation
```bash
pip install proofly
```

## Dependencies
- Python ≥ 3.8
- dataclasses
- typing
- datetime

## Quick Start
```python
from proofly import HealthAnalyzer
from proofly.models import DiabetesMetrics

# Initialize analyzer
analyzer = HealthAnalyzer()

# Create metrics
metrics = DiabetesMetrics(
    blood_glucose=120,  # mg/dL
    hba1c=6.5,         # %
    blood_pressure=130  # mmHg
)

# Analyze metrics
result = analyzer.analyze_metrics("diabetes", metrics)

# Access results
print(f"Health Score: {result.health_score}")
print(f"Risk Level: {result.risk_level}")
print(f"Confidence: {result.confidence_score}%")
print("\nRecommendations:")
for rec in result.recommendations:
    print(f"- {rec}")
```

## Usage Guide

### Supported Health Conditions

#### Diabetes Management
```python
from proofly import HealthAnalyzer
from proofly.models import DiabetesMetrics

analyzer = HealthAnalyzer()

diabetes_metrics = DiabetesMetrics(
    blood_glucose=120,
    hba1c=6.5,
    blood_pressure=130
)

result = analyzer.analyze_metrics(
    condition="diabetes",
    metrics=diabetes_metrics
)

analysis = result.get_detailed_analysis()
print(f"Health Score: {analysis['health_score']}")
print(f"Risk Level: {analysis['risk_level']}")
```

#### Hypertension Monitoring
```python
from proofly import HealthAnalyzer
from proofly.models import HypertensionMetrics

analyzer = HealthAnalyzer()
hypertension_metrics = HypertensionMetrics(
    systolic_pressure=130,
    diastolic_pressure=85,
    heart_rate=72
)
result = analyzer.analyze_metrics("hypertension", hypertension_metrics)
print(f"Health Score: {result.health_score}")
```

#### COPD Assessment
```python
from proofly.models import COPDMetrics

copd_metrics = COPDMetrics(
    oxygen_saturation=95,
    peak_flow=350,
    respiratory_rate=18
)
result = analyzer.analyze_metrics("copd", copd_metrics)
print(f"Health Score: {result.health_score}")

```

### Exporting Results
```python
# Export Example
from proofly import HealthAnalyzer
from proofly.models import DiabetesMetrics
from proofly.export import ReportGenerator
from proofly.enums import ReportFormat

analyzer = HealthAnalyzer()
metrics = DiabetesMetrics(blood_glucose=120, hba1c=6.5, blood_pressure=130)
result = analyzer.analyze_metrics("diabetes", metrics)

report = ReportGenerator.create_report(
    result,
    format=ReportFormat.PDF,
    include_graphs=True,
    include_recommendations=True
)
print(report['data'])
```

### Error Handling
```python
from proofly import HealthAnalyzer
from proofly.models import DiabetesMetrics
from proofly.exceptions import ValidationError, ConfigurationError, AnalysisError

analyzer = HealthAnalyzer()
try:
    result = analyzer.analyze_metrics(
        condition="diabetes",
        metrics=DiabetesMetrics(
            blood_glucose=500,
            hba1c=6.5,
            blood_pressure=130
        )
    )
except ValidationError as e:
    print(f"Validation Error: {e.message}")
```

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Support
* Issue Tracker: [GitHub Issues](https://github.com/moroii69/proofly/issues)
* Email Support: support@proofly.xyz

## Acknowledgments
* Built with input from healthcare professionals
* Implements evidence-based medical guidelines
* Uses validated statistical models
* Follows healthcare industry best practices
* Adheres to HIPAA compliance standards
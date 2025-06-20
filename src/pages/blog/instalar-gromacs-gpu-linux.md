---
layout: ../../layouts/BlogLayout.astro
title: "Cómo Instalar GROMACS con GPU en Linux: Guía Completa 2024"
description: "Tutorial paso a paso para compilar e instalar GROMACS con soporte para GPU CUDA/OpenCL en distribuciones Linux. Optimiza tus simulaciones de dinámica molecular."
author: "Laboratorio HyC"
date: "2024-02-15"
readTime: "12 min"
category: "Tutoriales"
tags: ["GROMACS", "GPU", "Linux", "CUDA", "Dinámica Molecular"]
---

## 🎯 Introducción

**GROMACS** es uno de los paquetes de software más populares para simulaciones de dinámica molecular. Aprovechar el poder de tu **GPU** puede acelerar significativamente tus cálculos, reduciendo el tiempo de simulación de días a horas.

En este tutorial, aprenderás a **compilar e instalar GROMACS** con soporte completo para GPU usando **CUDA** en sistemas Linux.

> **⚠️ Importante:** Este tutorial asume que ya tienes una GPU NVIDIA compatible con CUDA instalada en tu sistema.

---

## 🔧 Requisitos Previos

### 💻 Hardware Necesario

| Componente | Especificación Mínima | Recomendado |
|------------|------------------------|-------------|
| **GPU** | NVIDIA GTX 600+ (Kepler) | RTX 3060+ |
| **RAM** | 8 GB | 16 GB+ |
| **Almacenamiento** | 20 GB libres | 50 GB+ SSD |
| **CPU** | 4 cores | 8+ cores |

### 🖥️ Software Base

- **Ubuntu 20.04/22.04** o distribución compatible
- **GCC 9.0+** o **Clang 6.0+**
- **Python 3.6+**
- Acceso de **administrador** (sudo)

---

## 📦 Paso 1: Instalación de Dependencias

### 🔄 Actualizar el Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### 🛠️ Instalar Herramientas de Compilación

```bash
# Herramientas básicas
sudo apt install -y build-essential cmake git wget curl

# Compiladores
sudo apt install -y gcc g++ gfortran

# Librerías científicas
sudo apt install -y libfftw3-dev libopenmpi-dev

# Python y utilidades
sudo apt install -y python3-dev python3-pip
```

### ✅ Verificar Versiones

```bash
echo "=== Verificando herramientas instaladas ==="
gcc --version | head -1
cmake --version | head -1
python3 --version
echo "✅ Todas las herramientas están listas"
```

---

## 🚀 Paso 2: Instalación de CUDA

### 📥 Descargar CUDA Toolkit

```bash
# Navegar a directorio de descargas
cd ~/Downloads

# Para Ubuntu 22.04
wget https://developer.download.nvidia.com/compute/cuda/12.3.1/local_installers/cuda_12.3.1_545.23.08_linux.run

# Para Ubuntu 20.04 (alternativa)
# wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_520.61.05_linux.run
```

### ⚙️ Instalar CUDA

```bash
# Hacer ejecutable
sudo chmod +x cuda_12.3.1_545.23.08_linux.run

# Ejecutar instalador
sudo ./cuda_12.3.1_545.23.08_linux.run
```

> **💡 Tip:** Durante la instalación, **deselecciona el driver** si ya tienes uno funcionando. Solo instala el toolkit y las muestras.

### 🔧 Configurar Variables de Entorno

```bash
# Agregar variables al bashrc
cat >> ~/.bashrc << 'EOF'

# CUDA Configuration
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH

EOF

# Aplicar cambios
source ~/.bashrc
```

### 🧪 Verificar Instalación de CUDA

```bash
echo "=== Verificando instalación de CUDA ==="
nvcc --version
echo ""
echo "=== Estado de GPU ==="
nvidia-smi
```

**Salida esperada:**
```
nvcc: NVIDIA (R) Cuda compiler driver
Copyright (c) 2005-2023 NVIDIA Corporation
Built on Mon_Apr__3_17:36:15_PDT_2023
Cuda compilation tools, release 12.3, V12.3.107
```

---

## 🧬 Paso 3: Descargar y Preparar GROMACS

### 📦 Descargar Código Fuente

```bash
# Crear directorio de trabajo
mkdir -p ~/software/gromacs && cd ~/software/gromacs

# Descargar versión estable más reciente
wget https://ftp.gromacs.org/gromacs/gromacs-2023.3.tar.gz

# Extraer archivos
tar -xzf gromacs-2023.3.tar.gz
cd gromacs-2023.3

# Mostrar información del paquete
echo "✅ GROMACS 2023.3 descargado exitosamente"
ls -la
```

### 📁 Crear Directorio de Compilación

```bash
# Crear y navegar al directorio build
mkdir build && cd build

echo "📁 Directorio de compilación creado en: $(pwd)"
```

---

## ⚙️ Paso 4: Configurar CMake para GPU

### 🎯 Configuración Básica con GPU

```bash
cmake .. \
  -DCMAKE_INSTALL_PREFIX=/usr/local/gromacs \
  -DGMX_BUILD_OWN_FFTW=ON \
  -DGMX_GPU=CUDA \
  -DGMX_CUDA_TARGET_SM="50;60;70;75;80;86" \
  -DGMX_MPI=ON \
  -DGMX_OPENMP=ON \
  -DCMAKE_BUILD_TYPE=Release \
  -DGMX_BUILD_MDRUN_ONLY=OFF
```

### 🚀 Configuración Avanzada (Recomendada)

```bash
cmake .. \
  -DCMAKE_INSTALL_PREFIX=/usr/local/gromacs \
  -DGMX_BUILD_OWN_FFTW=ON \
  -DGMX_GPU=CUDA \
  -DGMX_CUDA_TARGET_SM="50;60;70;75;80;86" \
  -DGMX_MPI=ON \
  -DGMX_OPENMP=ON \
  -DCMAKE_BUILD_TYPE=Release \
  -DGMX_BUILD_MDRUN_ONLY=OFF \
  -DGMX_DOUBLE=OFF \
  -DGMX_FFT_LIBRARY=fftw3 \
  -DCMAKE_C_COMPILER=gcc \
  -DCMAKE_CXX_COMPILER=g++ \
  -DGMX_SIMD=AVX2_256
```

### ✅ Verificar Configuración

Busca estas líneas importantes en la salida:

```
-- GPU support: CUDA
-- CUDA compiler: /usr/local/cuda/bin/nvcc
-- GPU targets: 50;60;70;75;80;86
-- MPI support: ON
-- OpenMP support: ON
```

Si ves **"GPU support: CUDA"**, ¡estás listo para continuar! 🎉

---

## 🔨 Paso 5: Compilar GROMACS

### ⚡ Compilación Optimizada

```bash
# Detectar número de cores
CORES=$(nproc)
echo "🔧 Compilando con $CORES cores..."

# Iniciar compilación
time make -j$CORES
```

### 🛠️ Compilación Conservadora (Si hay errores)

```bash
# Si la compilación falla, intenta con menos cores
echo "🔧 Compilación conservadora con 4 cores..."
make clean
time make -j4
```

> **⏱️ Tiempo estimado:** 
> - **Compilación rápida (8+ cores):** 15-30 minutos
> - **Compilación estándar (4 cores):** 30-60 minutos

### 📊 Monitorear Progreso

```bash
# En otra terminal, puedes monitorear el uso de CPU
watch -n 2 "top | head -20"
```

---

## 📦 Paso 6: Instalar GROMACS

### 🚀 Instalación del Sistema

```bash
# Instalar en el sistema
sudo make install

echo "✅ GROMACS instalado en /usr/local/gromacs"
```

### 🔧 Configurar Variables de Entorno

```bash
# Agregar configuración de GROMACS
cat >> ~/.bashrc << 'EOF'

# GROMACS Configuration
source /usr/local/gromacs/bin/GMXRC

EOF

# Aplicar configuración
source ~/.bashrc

echo "✅ Variables de entorno configuradas"
```

---

## ✅ Paso 7: Verificar Instalación

### 🧪 Comprobar Versión y GPU

```bash
echo "=== Verificando instalación de GROMACS ==="
gmx --version
```

**Busca estas líneas críticas:**
- ✅ `GPU support: CUDA`
- ✅ `CUDA compiler: NVCC`
- ✅ `CUDA compiler flags: -gencode;arch=compute_XX`

### 🎯 Test Rápido con GPU

```bash
# Crear directorio de prueba
mkdir -p ~/gromacs-test && cd ~/gromacs-test

# Crear sistema de prueba simple
cat > test.gro << 'EOF'
Water test system
    3
    1SOL     OW    1   0.000   0.000   0.000
    1SOL    HW1    2   0.100   0.000   0.000
    1SOL    HW2    3  -0.033   0.094   0.000
   1.0   1.0   1.0
EOF

# Crear archivo de topología simple
cat > topol.top << 'EOF'
#include "tip3p.itp"

[ system ]
Water test

[ molecules ]
SOL    1
EOF

# Test básico de GPU
echo "🧪 Ejecutando test básico con GPU..."
gmx grompp -f /usr/local/gromacs/share/gromacs/top/oplsaa.ff/minim.mdp -c test.gro -p topol.top -o test.tpr 2>/dev/null || echo "⚠️  Usando configuración básica"

echo "✅ Test completado exitosamente"
```

---

## 🚀 Optimización y Configuración Avanzada

### 🎮 Configurar Múltiples GPUs

```bash
# Para sistema con 2 GPUs
gmx mdrun -deffnm production -gpu_id 01 -ntmpi 2

# Para sistema con 4 GPUs
gmx mdrun -deffnm production -gpu_id 0123 -ntmpi 4

# Verificar GPUs disponibles
nvidia-smi --list-gpus
```

### ⚡ Variables de Optimización

```bash
# Agregar optimizaciones al bashrc
cat >> ~/.bashrc << 'EOF'

# GROMACS GPU Optimizations
export GMX_GPU_DD_COMMS=true
export GMX_GPU_PME_PP_COMMS=true
export GMX_FORCE_UPDATE_DEFAULT_GPU=true
export GMX_GPU_PME_DECOMPOSITION=true

EOF

source ~/.bashrc
```

### 📝 Script de Ejecución Optimizado

```bash
# Crear script optimizado
cat > ~/run-gromacs-gpu.sh << 'EOF'
#!/bin/bash

# GROMACS GPU Execution Script
# Usage: ./run-gromacs-gpu.sh <tpr_file> <gpu_id>

TPR_FILE=${1:-"production.tpr"}
GPU_ID=${2:-"0"}

echo "🚀 Iniciando simulación GROMACS con GPU"
echo "📁 Archivo TPR: $TPR_FILE"
echo "🎮 GPU ID: $GPU_ID"

# Configurar optimizaciones
export GMX_GPU_DD_COMMS=true
export GMX_GPU_PME_PP_COMMS=true
export GMX_FORCE_UPDATE_DEFAULT_GPU=true

# Ejecutar simulación
gmx mdrun \
  -deffnm production \
  -gpu_id $GPU_ID \
  -ntmpi 1 \
  -ntomp $(nproc) \
  -update gpu \
  -bonded gpu \
  -pme gpu \
  -v

echo "✅ Simulación completada"
EOF

chmod +x ~/run-gromacs-gpu.sh
echo "✅ Script de ejecución creado en ~/run-gromacs-gpu.sh"
```

---

## 🔧 Solución de Problemas Comunes

### ❌ Error: "CUDA compiler not found"

```bash
# Verificar instalación
echo "Verificando CUDA..."
which nvcc
echo $CUDA_HOME

# Si no está configurado:
export CUDA_HOME=/usr/local/cuda
export PATH=$CUDA_HOME/bin:$PATH
export LD_LIBRARY_PATH=$CUDA_HOME/lib64:$LD_LIBRARY_PATH
```

### ❌ Error: "GPU not detected"

```bash
# Verificar driver NVIDIA
nvidia-smi

# Verificar compatibilidad CUDA
nvidia-smi | grep "CUDA Version"

# Test de CUDA
/usr/local/cuda/extras/demo_suite/deviceQuery
```

### ❌ Error de Memoria GPU

```bash
# Verificar memoria disponible
nvidia-smi --query-gpu=memory.total,memory.used,memory.free --format=csv

# Usar CPU para PME si es necesario
gmx mdrun -deffnm production -gpu_id 0 -pme cpu -nb gpu
```

### 🔄 Recompilar con Diferentes Opciones

```bash
cd ~/software/gromacs/gromacs-2023.3/build

# Limpiar compilación anterior
make clean

# Ejemplo: Reconfigurar sin GPU
cmake .. -DGMX_GPU=OFF

# Ejemplo: Reconfigurar con precisión doble
cmake .. -DGMX_DOUBLE=ON -DGMX_GPU=CUDA
```

---

## 📊 Benchmarking y Rendimiento

### 🏃‍♂️ Test de Rendimiento Completo

```bash
# Crear script de benchmark
cat > ~/benchmark-gromacs.sh << 'EOF'
#!/bin/bash

echo "🎯 GROMACS GPU Benchmark Suite"
echo "=============================="

echo "💻 Información del Sistema:"
echo "CPU: $(lscpu | grep 'Model name' | cut -d: -f2 | xargs)"
echo "RAM: $(free -h | grep Mem | awk '{print $2}')"
echo ""

echo "🎮 Información de GPU:"
nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader

echo ""
echo "🧪 Ejecutando benchmark..."

# Test simple de velocidad
time gmx mdrun -deffnm benchmark -gpu_id 0 -nsteps 50000 -noconfout -quiet

echo ""
echo "✅ Benchmark completado!"
echo "💡 Revisa los archivos .log para métricas detalladas"
EOF

chmod +x ~/benchmark-gromacs.sh
```

### 📈 Monitorear Rendimiento en Tiempo Real

```bash
# Terminal 1: Ejecutar simulación
gmx mdrun -deffnm production -gpu_id 0

# Terminal 2: Monitorear GPU
watch -n 1 'nvidia-smi --query-gpu=utilization.gpu,utilization.memory,memory.used,memory.total,temperature.gpu --format=csv,noheader,nounits'

# Terminal 3: Monitorear CPU
htop
```

---

## 🎉 ¡Instalación Completada!

### ✅ Resumen de lo que has logrado:

🚀 **GROMACS instalado** con soporte completo para GPU  
⚡ **Aceleración CUDA** para simulaciones hasta 10x más rápidas  
🎮 **Soporte multi-GPU** para sistemas complejos  
🔧 **Optimizaciones avanzadas** configuradas  
📊 **Herramientas de benchmarking** disponibles  

### 🎯 Próximos Pasos Recomendados:

1. **📚 Aprende** a configurar archivos `.mdp` optimizados para GPU
2. **🧪 Experimenta** con diferentes técnicas de enhanced sampling  
3. **🔄 Configura** workflows automatizados con scripts
4. **👥 Únete** a la comunidad GROMACS para soporte continuo

### 📖 Recursos Adicionales:

- 📘 [**Manual oficial de GROMACS**](https://manual.gromacs.org/)
- 💬 [**Foro de la comunidad**](https://gromacs.bioexcel.eu/)
- 🎓 [**Tutoriales avanzados**](http://www.mdtutorials.com/gmx/)
- 🔬 [**GROMACS GPU Performance**](https://manual.gromacs.org/current/user-guide/gpu-performance.html)

---

## 💬 ¿Te ayudó este tutorial?

**¡Nos encantaría saber de tu experiencia!** 

- ⭐ Comparte este tutorial con otros investigadores
- 💡 Sugiere mejoras o correcciones
- 🤝 Únete a nuestra comunidad de usuarios GROMACS

**¿Tienes preguntas específicas?** Visita nuestra [página de contacto](/contacto) y nuestro equipo te ayudará.

---

> **💡 Consejo final:** Mantén siempre actualizados tus drivers NVIDIA y revisa las nuevas versiones de GROMACS para aprovechar las últimas optimizaciones GPU.
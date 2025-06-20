---
layout: ../../layouts/BlogLayout.astro
title: "Instalación Completa de Ubuntu: Adiós Windows, Hola Ciencia"
description: "Guía detallada para instalar Ubuntu como único sistema operativo, configuración post-instalación y preparación del entorno para investigación científica."
author: "Laboratorio HyC"
date: "2024-02-10"
readTime: "15 min"
category: "Sistemas Operativos"
tags: ["Ubuntu", "Linux", "Instalación", "Configuración", "Ciencia"]
---

# Instalación Completa de Ubuntu: Adiós Windows, Hola Ciencia

## 🎯 ¿Por qué Ubuntu para Investigación Científica?

**Ubuntu** es la distribución Linux más popular para investigación científica. Ofrece:

- **🔓 Software libre** y de código abierto
- **⚡ Rendimiento superior** para cálculos intensivos  
- **🧬 Ecosistema científico** robusto
- **💻 Compatibilidad** con herramientas de investigación
- **🔒 Seguridad** y estabilidad empresarial

> **⚠️ Advertencia:** Este proceso **eliminará completamente Windows** de tu máquina. Asegúrate de hacer **respaldo completo** de tus datos importantes.

## 📋 Requisitos del Sistema

### Hardware Mínimo
- **Procesador:** 2 GHz dual-core
- **RAM:** 4 GB (8 GB recomendado)
- **Almacenamiento:** 25 GB libres
- **USB:** Puerto USB 2.0+

### Hardware Recomendado para Ciencia
- **Procesador:** Intel i5/i7 o AMD Ryzen 5/7
- **RAM:** 16-32 GB para simulaciones
- **Almacenamiento:** SSD 500 GB+
- **GPU:** NVIDIA para CUDA (opcional)

## 💾 Paso 1: Preparación y Respaldo

### Respaldar Datos Importantes

```bash
# Lista de archivos importantes a respaldar:
# - Documentos personales
# - Configuraciones de software
# - Bases de datos de investigación
# - Scripts y códigos
# - Favoritos del navegador
```

### Crear Lista de Software

```bash
# Software científico que necesitarás reinstalar:
# - Python/Anaconda
# - R/RStudio
# - LaTeX/Overleaf
# - Zotero/Mendeley
# - GROMACS, VMD, PyMOL
# - Visual Studio Code
```

## 🔽 Paso 2: Descargar Ubuntu

### Obtener la ISO Oficial

```bash
# Visitar página oficial
https://ubuntu.com/download/desktop

# Descargar Ubuntu 22.04.3 LTS (recomendado)
# Tamaño: ~4.6 GB
```

### Verificar Integridad (Opcional pero Recomendado)

```bash
# En Linux/macOS:
sha256sum ubuntu-22.04.3-desktop-amd64.iso

# Comparar con hash oficial:
# a4acfda10b18da50e2ec50ccaf860d7f20b389df8765611142305c0e911d16fd
```

## 💿 Paso 3: Crear USB Booteable

### Opción A: Usar Rufus (Windows)

1. **Descargar** [Rufus](https://rufus.ie/)
2. **Conectar** USB (8GB+)
3. **Seleccionar** ISO de Ubuntu
4. **Configurar:**
   - Esquema de partición: **GPT**
   - Sistema de archivos: **FAT32**
5. **Iniciar** proceso

### Opción B: Usar dd (Linux/macOS)

```bash
# Identificar USB
lsblk

# Crear booteable (¡CUIDADO con /dev/sdX!)
sudo dd if=ubuntu-22.04.3-desktop-amd64.iso of=/dev/sdX bs=4M status=progress && sync
```

### Opción C: Usar Balena Etcher (Multiplataforma)

```bash
# Descargar Balena Etcher
https://www.balena.io/etcher/

# Proceso gráfico intuitivo:
# 1. Seleccionar ISO
# 2. Seleccionar USB
# 3. Flash!
```

## ⚡ Paso 4: Configurar BIOS/UEFI

### Acceder a BIOS/UEFI

```bash
# Métodos comunes:
# - Presionar F2, F12, DEL durante arranque
# - Mantener Shift + Reiniciar (Windows 10/11)
```

### Configuraciones Importantes

```bash
# Configurar en BIOS/UEFI:
# 1. Boot Priority: USB First
# 2. Secure Boot: Disabled (opcional)
# 3. Fast Boot: Disabled
# 4. UEFI/Legacy: UEFI preferred
```

## 🚀 Paso 5: Instalación de Ubuntu

### Arrancar desde USB

1. **Reiniciar** con USB conectado
2. **Seleccionar** "Try or Install Ubuntu"
3. **Esperar** carga del sistema live

### Configuración Inicial

```bash
# Seleccionar idioma: Español/English
# Disposición de teclado: Spanish/US
# Conectar a WiFi (si es necesario)
```

### Tipo de Instalación

```bash
# Seleccionar: "Erase disk and install Ubuntu"
# ⚠️ ESTO BORRARÁ TODO EL DISCO
```

### Configuración de Particiones Avanzada (Opcional)

```bash
# Para usuarios avanzados:
# / (root): 30-50 GB, ext4
# /home: Resto del disco, ext4
# swap: 2x RAM (si RAM < 8GB)
```

### Información del Usuario

```bash
# Nombre completo: Dr. Juan Pérez
# Nombre de usuario: jperez (sin espacios)
# Contraseña: Segura123! (mínimo 8 caracteres)
# Cifrar carpeta personal: ✓ Recomendado
```

## ⚙️ Paso 6: Primera Configuración

### Actualizar el Sistema

```bash
sudo apt update && sudo apt upgrade -y
```

### Instalar Controladores Adicionales

```bash
# Abrir "Software & Updates"
# Pestaña "Additional Drivers"
# Seleccionar drivers propietarios si es necesario
```

### Configurar Repositorios

```bash
# Habilitar repositorios universe y multiverse
sudo add-apt-repository universe
sudo add-apt-repository multiverse
sudo apt update
```

## 🔧 Paso 7: Software Esencial

### Herramientas de Sistema

```bash
sudo apt install -y curl wget git vim nano
sudo apt install -y build-essential cmake
sudo apt install -y software-properties-common
sudo apt install -y apt-transport-https ca-certificates
sudo apt install -y gnupg lsb-release
```

### Codecs Multimedia

```bash
sudo apt install -y ubuntu-restricted-extras
sudo apt install -y vlc gimp
```

### Utilidades de Compresión

```bash
sudo apt install -y unrar zip unzip p7zip-full
```

## 🧬 Paso 8: Software Científico

### Python y Anaconda

```bash
# Descargar Anaconda
wget https://repo.anaconda.com/archive/Anaconda3-2023.09-0-Linux-x86_64.sh

# Instalar
bash Anaconda3-2023.09-0-Linux-x86_64.sh

# Recargar terminal
source ~/.bashrc

# Verificar instalación
conda --version
python --version
```

### R y RStudio

```bash
# Instalar R
sudo apt install -y r-base r-base-dev

# Descargar RStudio
wget https://download1.rstudio.org/electron/jammy/amd64/rstudio-2023.09.1-494-amd64.deb

# Instalar RStudio
sudo dpkg -i rstudio-2023.09.1-494-amd64.deb
sudo apt --fix-broken install
```

### LaTeX

```bash
# Instalación completa de LaTeX
sudo apt install -y texlive-full

# Editor LaTeX recomendado
sudo apt install -y texmaker
```

### Visual Studio Code

```bash
# Agregar repositorio
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'

# Instalar
sudo apt update
sudo apt install -y code
```

### Herramientas de Química/Biología

```bash
# VMD (Visualización molecular)
sudo apt install -y vmd

# PyMOL
sudo apt install -y pymol

# Avogadro (Editor molecular)
sudo apt install -y avogadro
```

## 🎨 Paso 9: Personalización

### Instalar GNOME Tweaks

```bash
sudo apt install -y gnome-tweaks gnome-shell-extensions
```

### Temas y Iconos

```bash
# Tema Yaru (ya incluido)
# Iconos adicionales
sudo apt install -y papirus-icon-theme
```

### Dock y Extensiones

```bash
# Dash to Dock (muy recomendado)
sudo apt install -y gnome-shell-extension-dash-to-dock

# Reiniciar GNOME Shell: Alt+F2, escribir 'r', Enter
```

## 🔒 Paso 10: Seguridad y Mantenimiento

### Configurar Firewall

```bash
sudo ufw enable
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### Automatizar Actualizaciones

```bash
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

### Herramientas de Respaldo

```bash
# Timeshift para respaldos del sistema
sudo apt install -y timeshift

# Configurar respaldo automático
sudo timeshift --create --comments "Instalación inicial"
```

## 📊 Paso 11: Optimización para Ciencia

### Configurar Swappiness

```bash
# Reducir uso de swap para mejor rendimiento
echo 'vm.swappiness=10' | sudo tee -a /etc/sysctl.conf
```

### Limitar Journald

```bash
# Limitar logs del sistema
sudo mkdir -p /etc/systemd/journald.conf.d
echo -e '[Journal]\nSystemMaxUse=100M' | sudo tee /etc/systemd/journald.conf.d/size.conf
```

### Configurar Variables de Entorno

```bash
# Agregar al ~/.bashrc
echo '# Configuración científica' >> ~/.bashrc
echo 'export EDITOR=nano' >> ~/.bashrc
echo 'export BROWSER=firefox' >> ~/.bashrc
echo 'export OMP_NUM_THREADS=4' >> ~/.bashrc
source ~/.bashrc
```

## 🧪 Paso 12: Configuración para Investigación

### Crear Estructura de Directorios

```bash
mkdir -p ~/Research/{Projects,Data,Scripts,Papers,Presentations}
mkdir -p ~/Software/{Source,Binaries}
mkdir -p ~/Backup
```

### Script de Configuración Científica

```bash
#!/bin/bash
# scientific-setup.sh

echo "🧬 Configurando entorno científico..."

# Crear aliases útiles
cat >> ~/.bashrc << 'EOF'

# Aliases científicos
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias research='cd ~/Research'
alias scripts='cd ~/Research/Scripts'
alias data='cd ~/Research/Data'
alias projects='cd ~/Research/Projects'

# Funciones útiles
extract () {
    if [ -f $1 ] ; then
        case $1 in
            *.tar.bz2)   tar xjf $1     ;;
            *.tar.gz)    tar xzf $1     ;;
            *.bz2)       bunzip2 $1     ;;
            *.rar)       unrar e $1     ;;
            *.gz)        gunzip $1      ;;
            *.tar)       tar xf $1      ;;
            *.tbz2)      tar xjf $1     ;;
            *.tgz)       tar xzf $1     ;;
            *.zip)       unzip $1       ;;
            *.Z)         uncompress $1  ;;
            *.7z)        7z x $1        ;;
            *)     echo "'$1' no se puede extraer" ;;
        esac
    else
        echo "'$1' no es un archivo válido"
    fi
}
EOF

source ~/.bashrc
echo "✅ Configuración completada!"
```

### Configurar Git

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@universidad.edu"
git config --global init.defaultBranch main
```

## 🔍 Paso 13: Verificación Final

### Test del Sistema

```bash
#!/bin/bash
# system-test.sh

echo "🧪 Verificando instalación..."

echo "📊 Información del sistema:"
lsb_release -a
uname -a

echo -e "\n🖥️ Hardware:"
lscpu | grep "Model name"
free -h
lsblk

echo -e "\n🐍 Python/Anaconda:"
python --version
conda --version

echo -e "\n📈 R:"
R --version | head -1

echo -e "\n📝 LaTeX:"
pdflatex --version | head -1

echo -e "\n✅ ¡Sistema listo para investigación científica!"
```

## 🚀 Próximos Pasos

### Software Adicional por Instalar

```bash
# Según tu área de investigación:
# - GROMACS (dinámica molecular)
# - ImageJ/FIJI (análisis de imágenes)
# - Zotero (gestión bibliográfica)
# - SPSS/SAS (estadística)
# - MATLAB (si tienes licencia)
# - Docker (contenedores)
```

### Configuraciones Avanzadas

```bash
# Para usuarios avanzados:
# - Configurar cluster/HPC access
# - Instalar NVIDIA drivers para CUDA
# - Configurar VPN institucional
# - Montar drives de red
```

## 🎉 ¡Felicidades!

Has instalado exitosamente **Ubuntu** y configurado un entorno completo para investigación científica. Tu sistema ahora tiene:

✅ **Sistema operativo** moderno y seguro  
✅ **Software científico** esencial instalado  
✅ **Entorno de desarrollo** configurado  
✅ **Herramientas de investigación** listas  
✅ **Seguridad y respaldos** configurados

### Ventajas que Ganaste

- **🚀 Rendimiento:** 20-30% más rápido en cálculos
- **💰 Costo:** $0 en licencias de software
- **🔒 Seguridad:** Sistema más resistente a malware  
- **🧬 Ciencia:** Acceso a todo el ecosistema científico libre
- **⚡ Productividad:** Flujo de trabajo más eficiente

### Recursos de Aprendizaje

- [Ubuntu Official Documentation](https://help.ubuntu.com/)
- [Linux Command Line Basics](https://ubuntu.com/tutorials/command-line-for-beginners)
- [Scientific Python Ecosystem](https://scipy.org/)
- [R for Data Science](https://r4ds.had.co.nz/)

---

**¡Bienvenido al mundo Linux!** 🐧 Tu investigación científica acaba de dar un gran salto hacia adelante.
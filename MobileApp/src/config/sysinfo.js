import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSystemInfo } from './actions.js'

const SystemInfoListener = () => {
    const socket = useSelector((state) => state.socket);
    const dispatch = useDispatch();

  useEffect(() => {
    if (socket) {
      socket.on('system-info', (data) => {
        // console.log(data)
        dispatch(updateSystemInfo(data));
      });
    }

    return () => {
      if (socket) {
        socket.off('system-info');
      }
    };
  }, [socket, dispatch]);


  return null;
};

class CPUInfo {
    constructor(brand, speed, cores, threads, load) {
      this.brand = brand;
      this.speed = speed;
      this.cores = cores;
      this.threads = threads;
      this.load = load;
    }
  }

  class GPUInfo {
    constructor(model, vram, temperature, fanSpeed, utilizationGpu, utilizationMemory) {
      this.model = model;
      this.vram = vram;
      this.temperature = temperature;
      this.fanSpeed = fanSpeed;
      this.utilizationGpu = utilizationGpu;
      this.utilizationMemory = utilizationMemory;
    }
  }

  class MemInfo {
    constructor(total, used, free, load){
        this.total = total;
        this.used = used;
        this.free = free;
        this.load = load;
    }
  }

export const getMemInfo = (systemInfo) => {
  if (!systemInfo || !systemInfo.memory) {
    return new MemInfo('N/A', 'N/A', 'N/A', 'N/A');
  }
    const memInfo = new MemInfo(
        `${byteToGibibyte(systemInfo.memory.total)}GB`,
        `${byteToGibibyte(systemInfo.memory.used)}GB`,
        `${byteToGibibyte(systemInfo.memory.free)}GB`,
        `${gpuMemUsage(systemInfo.memory.free, systemInfo.memory.total)}%`
    );
    return memInfo;
}

export const getCPUInfo = (systemInfo) => {
  if (!systemInfo || !systemInfo.cpu) {
    return new CPUInfo('N/A', 'N/A', 'N/A', 'N/A', 'N/A');
  }

    const cpuInfo = new CPUInfo(
    `${systemInfo.cpu.manufacturer} ${systemInfo.cpu.brand}`, 
    systemInfo.cpu.speed, 
    systemInfo.cpu.physicalCores, 
    systemInfo.cpu.performanceCores, 
    getCPULoadInfo(systemInfo));
    return cpuInfo;
};

export const getGPUInfo = (systemInfo) => {
  if (!systemInfo || !systemInfo.gpu) {
    return new GPUInfo('N/A', 'N/A', 'N/A', 'N/A', 'N/A', 'N/A');
  }

    const gpuInfo = new GPUInfo(
        systemInfo.gpu.controllers[0].model,
        `${systemInfo.gpu.controllers[0].vram/1024}GB`,
        `${systemInfo.gpu.controllers[0].temperatureGpu}C`,
        `${systemInfo.gpu.controllers[0].fanSpeed ?? 0}%`,
        `${systemInfo.gpu.controllers[0].utilizationGpu ?? 0}%`,
        `${gpuMemUsage(systemInfo.gpu.controllers[0].memoryFree, systemInfo.gpu.controllers[0].vram)}%`
    )
    return gpuInfo;
}
 

const byteToGibibyte = (totalByte) => {
    return Math.round((totalByte / 1073741824) * 10) / 10;
}

const gpuMemUsage = (memFree, memTotal) => {
    return (Math.floor((1-(memFree/memTotal)) * 100) / 100)*100;
  }

export const getCPULoadInfo = (systemInfo) => {
    let calc = Math.floor(systemInfo.utilization.cpu.currentLoad* 100) / 100;
    return `${calc}%`;
};

export default SystemInfoListener;

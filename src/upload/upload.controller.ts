// src/upload/upload.controller.ts
import { Controller, Post, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';
import type { Response } from 'express';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async handleFileUpload(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res: Response) {
    const processedData = files.map(file => {
      // Parse the file using XLSX
      const workbook = XLSX.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      
      // Transform data into the desired structure
      const transformedData = transformData(jsonData);
      
      return transformedData;
    });

    // Send the processed data back to the client
    res.json(processedData);
  }
}

function transformData(data: any) {
  // Your transformation logic here
  // For example, if the XLSX data is flat, you may need to group it,
  // sort it, or nest it according to your requirements
  return data;
}

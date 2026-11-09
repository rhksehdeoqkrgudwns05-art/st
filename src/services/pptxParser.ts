/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import JSZip from 'jszip';
import { ParsedSlide } from '../types/curriculum';

export class PptxParserService {
  /**
   * Parse a .pptx file in the browser using JSZip and native DOMParser.
   * Extracts text slide by slide, preserving slide order, title, and body text.
   */
  static async parsePptx(file: File): Promise<ParsedSlide[]> {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.ppt') && !fileName.endsWith('.pptx')) {
      throw new Error(
        '지원하지 않는 레거시 .ppt 파일 형식입니다. 파워포인트에서 "다른 이름으로 저장"을 선택해 최신 .pptx 형식으로 저장한 뒤 다시 업로드해 주세요.'
      );
    }

    if (!fileName.endsWith('.pptx')) {
      throw new Error('파워포인트 파일(.pptx)만 업로드할 수 있습니다.');
    }

    let zip: JSZip;
    try {
      zip = await JSZip.loadAsync(file);
    } catch {
      throw new Error('파일을 여는 중 오류가 발생했습니다. 유효한 .pptx 압축 파일인지 확인해 주세요.');
    }

    // Find all slide XML files
    const slideFileNames = Object.keys(zip.files).filter(path =>
      /^ppt\/slides\/slide\d+\.xml$/i.test(path)
    );

    if (slideFileNames.length === 0) {
      throw new Error('PPTX 파일 내에서 슬라이드 텍스트를 찾을 수 없습니다.');
    }

    // Sort slide file names by their natural numerical index (slide1.xml, slide2.xml, ...)
    slideFileNames.sort((a, b) => {
      const numA = parseInt(a.replace(/[^\d]/g, ''), 10) || 0;
      const numB = parseInt(b.replace(/[^\d]/g, ''), 10) || 0;
      return numA - numB;
    });

    const parsedSlides: ParsedSlide[] = [];
    const domParser = new DOMParser();

    for (let i = 0; i < slideFileNames.length; i++) {
      const slidePath = slideFileNames[i];
      const slideZipEntry = zip.file(slidePath);
      if (!slideZipEntry) continue;

      const xmlText = await slideZipEntry.async('string');
      const xmlDoc = domParser.parseFromString(xmlText, 'application/xml');

      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        console.warn(`Error parsing XML in ${slidePath}`);
        continue;
      }

      // Extract paragraphs (<a:p>)
      const paragraphElements = Array.from(xmlDoc.getElementsByTagName('a:p'));
      const textLines: string[] = [];

      for (const p of paragraphElements) {
        // Collect text runs (<a:t>) inside this paragraph
        const textElements = Array.from(p.getElementsByTagName('a:t'));
        const line = textElements.map(t => t.textContent || '').join('').trim();
        if (line) {
          textLines.push(line);
        }
      }

      // If no text found via a:p, try general a:t
      if (textLines.length === 0) {
        const textElements = Array.from(xmlDoc.getElementsByTagName('a:t'));
        const raw = textElements.map(t => t.textContent || '').join(' ').trim();
        if (raw) {
          textLines.push(raw);
        }
      }

      let title = `슬라이드 ${i + 1}`;
      let body = '';

      if (textLines.length > 0) {
        // First line is often title
        title = textLines[0];
        if (textLines.length > 1) {
          body = textLines.slice(1).join('\n\n');
        }
      }

      parsedSlides.push({
        slideNumber: i + 1,
        title: title || `슬라이드 ${i + 1}`,
        body: body,
        rawText: textLines.join('\n')
      });
    }

    return parsedSlides;
  }
}

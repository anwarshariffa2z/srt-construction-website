/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register a standard font to avoid rendering issues
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
  ]
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 0,
    fontFamily: 'Open Sans',
  },
  coverImageContainer: {
    width: '100%',
    height: 400,
    backgroundColor: '#1a1712',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  headerBox: {
    backgroundColor: '#1a1712',
    padding: 40,
    color: '#ffffff',
  },
  projectTitle: {
    fontSize: 28,
    fontWeight: 600,
    marginBottom: 10,
    color: '#c9a468', // Bronze
  },
  projectCategory: {
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#ffffff',
    opacity: 0.8,
  },
  contentSection: {
    padding: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1a1712',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#c9a468',
    paddingBottom: 10,
  },
  descriptionText: {
    fontSize: 11,
    lineHeight: 1.6,
    color: '#333333',
    marginBottom: 15,
  },
  metadataRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  metadataLabel: {
    width: 100,
    fontSize: 10,
    fontWeight: 600,
    color: '#c9a468',
    textTransform: 'uppercase',
  },
  metadataValue: {
    flex: 1,
    fontSize: 10,
    color: '#333333',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1a1712',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#ffffff',
    fontSize: 10,
  },
  footerAccent: {
    color: '#c9a468',
    fontSize: 10,
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    paddingTop: 0,
  },
  galleryImage: {
    width: '46%',
    height: 150,
    margin: '2%',
    objectFit: 'cover',
  }
});

interface PdfBrochureProps {
  project: {
    title: string;
    category: string;
    location?: string;
    area?: string;
    completionDate?: string;
    description?: any[];
    image: string; // The resolved URL
    galleryImages?: string[];
  }
}

// Helper to extract text from PortableText if it's an array
const extractText = (blocks: any) => {
  if (typeof blocks === 'string') return blocks;
  if (Array.isArray(blocks)) {
    return blocks
      .filter(val => val._type === 'block')
      .map(block => block.children.map((child: any) => child.text).join(''))
      .join('\\n\\n');
  }
  return '';
};

export const PdfBrochure = ({ project }: PdfBrochureProps) => {
  const plainTextDescription = extractText(project.description);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cover Image */}
        <View style={styles.coverImageContainer}>
          {project.image && (
            <Image src={project.image} style={styles.coverImage} />
          )}
        </View>

        {/* Header */}
        <View style={styles.headerBox}>
          <Text style={styles.projectCategory}>{project.category || 'Architecture'}</Text>
          <Text style={styles.projectTitle}>{project.title}</Text>
          
          {(project.location || project.area || project.completionDate) && (
            <View style={{ marginTop: 20 }}>
              {project.location && (
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Location</Text>
                  <Text style={{ ...styles.metadataValue, color: '#ffffff' }}>{project.location}</Text>
                </View>
              )}
              {project.area && (
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Total Area</Text>
                  <Text style={{ ...styles.metadataValue, color: '#ffffff' }}>{project.area}</Text>
                </View>
              )}
              {project.completionDate && (
                <View style={styles.metadataRow}>
                  <Text style={styles.metadataLabel}>Completed</Text>
                  <Text style={{ ...styles.metadataValue, color: '#ffffff' }}>{new Date(project.completionDate).getFullYear()}</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* Project Description */}
        <View style={styles.contentSection}>
          <Text style={styles.sectionTitle}>Project Overview</Text>
          {plainTextDescription ? (
            <Text style={styles.descriptionText}>{plainTextDescription}</Text>
          ) : (
            <Text style={styles.descriptionText}>A premium project by SRT Constructions.</Text>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>SRT CONSTRUCTIONS</Text>
          <Text style={styles.footerAccent}>+91 8056880272 | srt-construction-website.pages.dev</Text>
        </View>
      </Page>
      
      {/* Optional Gallery Page if there are gallery images */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <Page size="A4" style={styles.page}>
           <View style={{ ...styles.headerBox, padding: 30 }}>
             <Text style={styles.projectTitle}>Gallery</Text>
             <Text style={styles.projectCategory}>{project.title}</Text>
           </View>
           <View style={{ ...styles.imagesGrid, marginTop: 20 }}>
              {project.galleryImages.slice(0, 6).map((img, idx) => (
                 <Image key={idx} src={img} style={styles.galleryImage} />
              ))}
           </View>
           <View style={styles.footer}>
            <Text style={styles.footerText}>SRT CONSTRUCTIONS</Text>
            <Text style={styles.footerAccent}>+91 8056880272 | srt-construction-website.pages.dev</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};

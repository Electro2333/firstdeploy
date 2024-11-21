"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '../components/ui/card';
import { CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Check, Copy, Wand2 } from 'lucide-react';

// SEO Analysis Utility
const analyzeSEO = (content, keywords) => {
  const keywordsList = keywords.split(',').map(k => k.trim().toLowerCase());

  const analysis = {
    keywordDensity: {},
    readabilityScore: 0,
    headingOptimization: false,
    contentLength: content.length,
  };

  // Keyword Density Calculation
  keywordsList.forEach(keyword => {
    const matches = (content.toLowerCase().match(new RegExp(keyword, 'g')) || []).length;
    analysis.keywordDensity[keyword] = ((matches * keyword.length) / content.length) * 100;
  });

  // Readability Score (Flesch-Kincaid approximation)
  const words = content.split(/\s+/).length;
  const sentences = content.split(/[.!?]/).length;
  analysis.readabilityScore = 206.835 - 1.015 * (words / sentences) - 84.6 * (sentences / words);

  // Heading Optimization Check
  analysis.headingOptimization =
    content.includes('# ') &&
    content.includes('## ') &&
    keywordsList.some(keyword =>
      content.toLowerCase().includes(keyword)
    );

  return analysis;
};

// Mock AI Content Generation Service (replace with actual API)
const generateAIContent = async (productName, category, features, keywords) => {
  // Simulated AI generation - would be replaced with actual API call
  return `# ${productName} - Comprehensive Tech Review

## In-Depth Analysis of ${category} Innovation

### Product Overview
The ${productName} emerges as a groundbreaking device in the ${category} landscape, pushing the boundaries of technological innovation.

### Key Technological Highlights
${features.split(',').map(feature => `- **${feature.trim()}**: Revolutionizing user experience`).join('\n')}

### Performance Insights
Our rigorous testing reveals that the ${productName} stands out through its:
- Exceptional build quality
- Cutting-edge performance
- Innovative feature set

### Technical Specifications
- Detailed breakdown of core specifications
- Comparative analysis with market competitors

### User Experience
${keywords.split(',').map(keyword => `- ${keyword.trim()}: A game-changing aspect`).join('\n')}

### Final Verdict
After comprehensive evaluation, the ${productName} represents a significant milestone in ${category} technology.
  `;
};

const TechReviewAIEnhanced = () => {
  // State Management
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [keyFeatures, setKeyFeatures] = useState('');
  const [seoKeywords, setSEOKeywords] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [seoAnalysis, setSEOAnalysis] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Categories and Advanced Configuration
  const categories = [
    'Smartphones', 'Laptops', 'Tablets', 'Wearables',
    'Gaming Devices', 'Audio Equipment', 'Smart Home Devices'
  ];

  // Generate Content Handler
  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      // Simulated AI Content Generation
      const content = await generateAIContent(
        productName,
        productCategory,
        keyFeatures,
        seoKeywords
      );

      // Generate Content
      setGeneratedContent(content);

      // Perform SEO Analysis
      const analysis = analyzeSEO(content, seoKeywords);
      setSEOAnalysis(analysis);
    } catch (error) {
      console.error('Content Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to Clipboard
  const handleCopyContent = () => {
    navigator.clipboard.writeText(generatedContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wand2 className="mr-2" /> Advanced Tech Review AI Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generator">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generator">Content Generator</TabsTrigger>
              <TabsTrigger value="seoAnalysis">SEO Analysis</TabsTrigger>
            </TabsList>

            {/* Content Generator Tab */}
            <TabsContent value="generator">
              <div className="space-y-4">
                {/* Input Fields */}
                <Input
                  placeholder="Enter Product Name (e.g., iPhone 15 Pro)"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />

                <Select onValueChange={setProductCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Product Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Enter Key Features (comma-separated)"
                  value={keyFeatures}
                  onChange={(e) => setKeyFeatures(e.target.value)}
                />

                <Input
                  placeholder="Enter SEO Keywords (comma-separated)"
                  value={seoKeywords}
                  onChange={(e) => setSEOKeywords(e.target.value)}
                />

                {/* Generate Content Button */}
                <Button
                  onClick={handleGenerateContent}
                  disabled={!productName || !productCategory || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? 'Generating...' : 'Generate Review Content'}
                </Button>

                {/* Generated Content Area */}
                {generatedContent && (
                  <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                      <CardTitle>Generated Review Content</CardTitle>
                      <Button
                        variant="ghost"
                        onClick={handleCopyContent}
                      >
                        {isCopied ? <Check className="text-green-500" /> : <Copy />}
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        value={generatedContent}
                        readOnly
                        className="h-64"
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* SEO Analysis Tab */}
            <TabsContent value="seoAnalysis">
              {seoAnalysis ? (
                <Card>
                  <CardHeader>
                    <CardTitle>SEO Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold">Keyword Density</h3>
                        {Object.entries(seoAnalysis.keywordDensity).map(([keyword, density]) => (
                          <p key={keyword}>
                            {keyword}: {density.toFixed(2)}%
                          </p>
                        ))}
                      </div>
                      <div>
                        <h3 className="font-semibold">Content Metrics</h3>
                        <p>Readability Score: {seoAnalysis.readabilityScore.toFixed(2)}</p>
                        <p>Content Length: {seoAnalysis.contentLength} characters</p>
                        <p>
                          Heading Optimization:
                          {seoAnalysis.headingOptimization ? '✓ Optimized' : '✗ Needs Improvement'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-center text-gray-500">
                  Generate content to see SEO analysis
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechReviewAIEnhanced;

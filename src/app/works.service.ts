import { Injectable } from '@angular/core';
import { Work } from './work';

@Injectable({
  providedIn: 'root'
})
export class WorksService {
  private works: Work[] = [
    {
      title: 'Project One',
      type: 'Project',
      imageUrl: 'https://via.placeholder.com/300x200?text=Project+1',
      url: '#',
      timestamp: new Date('2023-01-15'),
      description: 'A brief description of Project One.',
      tags: ['Angular', 'TypeScript', 'Firebase']
    },
    {
      title: 'Project Two',
      type: 'Project',
      imageUrl: 'https://via.placeholder.com/300x200?text=Project+2',
      url: '#',
      timestamp: new Date('2022-11-01'),
      description: 'A brief description of Project Two.',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Project Three',
      type: 'Project',
      imageUrl: 'https://via.placeholder.com/300x200?text=Project+3',
      url: '#',
      timestamp: new Date('2023-03-20'),
      description: 'A brief description of Project Three.',
      tags: ['Vue.js', 'Python', 'Django']
    },
    {
      title: 'Publication A',
      type: 'Publication',
      imageUrl: 'https://via.placeholder.com/300x200?text=Publication+A',
      url: '#',
      timestamp: new Date('2024-02-10'),
      publicationPlatform: 'Journal of Science',
      year: 2024,
      description: 'An article about scientific discoveries.'
    },
    {
      title: 'Article X',
      type: 'Article',
      imageUrl: 'https://picsum.photos/seed/articleX/300/200',
      url: '#',
      timestamp: new Date('2023-09-05'),
      publicationPlatform: 'Tech Blog',
      year: 2023,
      description: 'A blog post on new technologies.'
    }
  ];

  constructor() { }

  getWorks(type?: 'Project' | 'Publication' | 'Article'): Work[] {
    if (type) {
      return this.works.filter(work => work.type === type).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
    return this.works.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getFeaturedWorks(count: number): Work[] {
    return this.works
      .filter(work => work.type === 'Project' || work.type === 'Publication')
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, count);
  }
}

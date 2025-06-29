import type { Meta, StoryObj } from '@storybook/react'
import { Flame, Download, ArrowRight } from 'lucide-react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon']
    },
    loading: {
      control: 'boolean'
    },
    animated: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Flame className="h-4 w-4" />
      </Button>
    </div>
  )
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button leftIcon={<Download className="h-4 w-4" />}>
        Download
      </Button>
      <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
        Continue
      </Button>
      <Button 
        leftIcon={<Flame className="h-4 w-4" />}
        rightIcon={<ArrowRight className="h-4 w-4" />}
      >
        Get Started
      </Button>
    </div>
  )
}

export const Loading: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button loading>Loading</Button>
      <Button variant="outline" loading>Loading Outline</Button>
      <Button variant="secondary" loading>Loading Secondary</Button>
    </div>
  )
}

export const NonAnimated: Story = {
  args: {
    children: 'Non-animated Button',
    animated: false
  }
}
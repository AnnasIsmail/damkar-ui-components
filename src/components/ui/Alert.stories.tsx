import type { Meta, StoryObj } from '@storybook/react'
import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from './Alert'

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'warning', 'success', 'info']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  )
}

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>
          This is a default alert with some information.
        </AlertDescription>
      </Alert>

      <Alert variant="info">
        <Info className="h-4 w-4" />
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is an informational alert with helpful details.
        </AlertDescription>
      </Alert>

      <Alert variant="success">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your action was completed successfully.
        </AlertDescription>
      </Alert>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Please review this information carefully.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export const WithoutIcon: Story = {
  render: () => (
    <Alert>
      <AlertTitle>No Icon Alert</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon, just text content.
      </AlertDescription>
    </Alert>
  )
}

export const OnlyDescription: Story = {
  render: () => (
    <Alert variant="info">
      <Info className="h-4 w-4" />
      <AlertDescription>
        This alert only has a description without a title.
      </AlertDescription>
    </Alert>
  )
}
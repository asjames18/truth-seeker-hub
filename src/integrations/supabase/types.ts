export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      analytics_daily_visitors: {
        Row: {
          analytics_scope: string
          created_at: string
          date: string
          id: string
          subject_key: string
          visitor_key: string
        }
        Insert: {
          analytics_scope: string
          created_at?: string
          date: string
          id?: string
          subject_key: string
          visitor_key: string
        }
        Update: {
          analytics_scope?: string
          created_at?: string
          date?: string
          id?: string
          subject_key?: string
          visitor_key?: string
        }
        Relationships: []
      }
      analytics_ingestion_events: {
        Row: {
          created_at: string
          id: string
          metadata: Json
          pipeline: string
          reason: string | null
          status: string
          subject_key: string | null
          subject_type: string
          visitor_key: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metadata?: Json
          pipeline: string
          reason?: string | null
          status: string
          subject_key?: string | null
          subject_type: string
          visitor_key?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metadata?: Json
          pipeline?: string
          reason?: string | null
          status?: string
          subject_key?: string | null
          subject_type?: string
          visitor_key?: string | null
        }
        Relationships: []
      }
      blog_calendar_assignments: {
        Row: {
          content_id: string | null
          created_at: string
          id: string
          lane: string
          updated_at: string
          week_start: string
        }
        Insert: {
          content_id?: string | null
          created_at?: string
          id?: string
          lane: string
          updated_at?: string
          week_start: string
        }
        Update: {
          content_id?: string | null
          created_at?: string
          id?: string
          lane?: string
          updated_at?: string
          week_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_calendar_assignments_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_calendar_assignments_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "latest_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_monthly_views: {
        Row: {
          created_at: string
          id: string
          session_id: string
          slug: string
          year_month: string
        }
        Insert: {
          created_at?: string
          id?: string
          session_id: string
          slug: string
          year_month: string
        }
        Update: {
          created_at?: string
          id?: string
          session_id?: string
          slug?: string
          year_month?: string
        }
        Relationships: []
      }
      books: {
        Row: {
          affiliate_label: string | null
          affiliate_merchant: string | null
          affiliate_url: string | null
          author: string | null
          author_name: string | null
          body_md: string | null
          created_at: string | null
          id: string
          metadata: Json | null
          published: boolean | null
          published_at: string | null
          published_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          slug: string
          title: string
          topics: string[] | null
          updated_at: string | null
          workflow_state: string | null
        }
        Insert: {
          affiliate_label?: string | null
          affiliate_merchant?: string | null
          affiliate_url?: string | null
          author?: string | null
          author_name?: string | null
          body_md?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug: string
          title: string
          topics?: string[] | null
          updated_at?: string | null
          workflow_state?: string | null
        }
        Update: {
          affiliate_label?: string | null
          affiliate_merchant?: string | null
          affiliate_url?: string | null
          author?: string | null
          author_name?: string | null
          body_md?: string | null
          created_at?: string | null
          id?: string
          metadata?: Json | null
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug?: string
          title?: string
          topics?: string[] | null
          updated_at?: string | null
          workflow_state?: string | null
        }
        Relationships: []
      }
      certificates: {
        Row: {
          cert_id: string
          course_slug: string
          created_at: string | null
          id: string
          issued_at: string | null
          metadata: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cert_id: string
          course_slug: string
          created_at?: string | null
          id?: string
          issued_at?: string | null
          metadata?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cert_id?: string
          course_slug?: string
          created_at?: string | null
          id?: string
          issued_at?: string | null
          metadata?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      content: {
        Row: {
          author_id: string | null
          body_html: string | null
          body_md: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at: string | null
          featured: boolean | null
          id: string
          metadata: Json | null
          published_at: string | null
          published_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scheduled_at: string | null
          seo_description: string | null
          seo_keywords: string[] | null
          seo_title: string | null
          slug: string
          status: Database["public"]["Enums"]["content_status"] | null
          summary: string | null
          title: string
          updated_at: string | null
          workflow_state: string | null
        }
        Insert: {
          author_id?: string | null
          body_html?: string | null
          body_md?: string | null
          content_type: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          featured?: boolean | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug: string
          status?: Database["public"]["Enums"]["content_status"] | null
          summary?: string | null
          title: string
          updated_at?: string | null
          workflow_state?: string | null
        }
        Update: {
          author_id?: string | null
          body_html?: string | null
          body_md?: string | null
          content_type?: Database["public"]["Enums"]["content_type"]
          created_at?: string | null
          featured?: boolean | null
          id?: string
          metadata?: Json | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_at?: string | null
          seo_description?: string | null
          seo_keywords?: string[] | null
          seo_title?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["content_status"] | null
          summary?: string | null
          title?: string
          updated_at?: string | null
          workflow_state?: string | null
        }
        Relationships: []
      }
      content_activities: {
        Row: {
          action: string
          activity_type: string | null
          content_id: string | null
          created_at: string | null
          description: string | null
          details: Json | null
          id: string
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          action: string
          activity_type?: string | null
          content_id?: string | null
          created_at?: string | null
          description?: string | null
          details?: Json | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          action?: string
          activity_type?: string | null
          content_id?: string | null
          created_at?: string | null
          description?: string | null
          details?: Json | null
          id?: string
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_activities_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_activities_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "latest_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      content_analytics: {
        Row: {
          avg_time_on_page: number | null
          content_id: string
          content_type: string
          created_at: string | null
          date: string
          id: string
          unique_visitors: number | null
          views: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          content_id: string
          content_type: string
          created_at?: string | null
          date: string
          id?: string
          unique_visitors?: number | null
          views?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          date?: string
          id?: string
          unique_visitors?: number | null
          views?: number | null
        }
        Relationships: []
      }
      content_external_links: {
        Row: {
          content_slug: string
          content_type: Database["public"]["Enums"]["content_type_for_link"]
          created_at: string | null
          id: string
          resource_id: string
          sort_order: number | null
        }
        Insert: {
          content_slug: string
          content_type: Database["public"]["Enums"]["content_type_for_link"]
          created_at?: string | null
          id?: string
          resource_id: string
          sort_order?: number | null
        }
        Update: {
          content_slug?: string
          content_type?: Database["public"]["Enums"]["content_type_for_link"]
          created_at?: string | null
          id?: string
          resource_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_external_links_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "external_resources"
            referencedColumns: ["id"]
          },
        ]
      }
      content_media: {
        Row: {
          content_id: string
          created_at: string | null
          media_id: string
          relationship_type: string
          sort_order: number | null
        }
        Insert: {
          content_id: string
          created_at?: string | null
          media_id: string
          relationship_type?: string
          sort_order?: number | null
        }
        Update: {
          content_id?: string
          created_at?: string | null
          media_id?: string
          relationship_type?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_media_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "latest_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_media_media_id_fkey"
            columns: ["media_id"]
            isOneToOne: false
            referencedRelation: "media_library"
            referencedColumns: ["id"]
          },
        ]
      }
      content_page_analytics: {
        Row: {
          avg_time_on_page: number
          content_family: string
          created_at: string
          date: string
          id: string
          page_key: string
          unique_visitors: number
          views: number
        }
        Insert: {
          avg_time_on_page?: number
          content_family: string
          created_at?: string
          date: string
          id?: string
          page_key: string
          unique_visitors?: number
          views?: number
        }
        Update: {
          avg_time_on_page?: number
          content_family?: string
          created_at?: string
          date?: string
          id?: string
          page_key?: string
          unique_visitors?: number
          views?: number
        }
        Relationships: []
      }
      content_schedules: {
        Row: {
          action: string
          completed_at: string | null
          content_id: string | null
          created_at: string | null
          created_by: string | null
          error_message: string | null
          executed_at: string | null
          id: string
          scheduled_at: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          action: string
          completed_at?: string | null
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          scheduled_at: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          action?: string
          completed_at?: string | null
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          error_message?: string | null
          executed_at?: string | null
          id?: string
          scheduled_at?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_schedules_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_schedules_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "latest_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      content_tags: {
        Row: {
          content_id: string
          tag_id: string
        }
        Insert: {
          content_id: string
          tag_id: string
        }
        Update: {
          content_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_tags_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "latest_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      content_versions: {
        Row: {
          body_html: string | null
          body_md: string | null
          content_id: string | null
          created_at: string | null
          created_by: string | null
          id: string
          metadata: Json | null
          status: Database["public"]["Enums"]["content_status"] | null
          title: string
          version_number: number
        }
        Insert: {
          body_html?: string | null
          body_md?: string | null
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["content_status"] | null
          title: string
          version_number: number
        }
        Update: {
          body_html?: string | null
          body_md?: string | null
          content_id?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          metadata?: Json | null
          status?: Database["public"]["Enums"]["content_status"] | null
          title?: string
          version_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "content_versions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "content"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_versions_content_id_fkey"
            columns: ["content_id"]
            isOneToOne: false
            referencedRelation: "latest_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      corrections_requests: {
        Row: {
          anon_id: string | null
          created_at: string | null
          description: string
          email: string | null
          id: string
          issue_type: string
          notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          source_link: string | null
          status: string | null
          updated_at: string | null
          url: string
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          created_at?: string | null
          description: string
          email?: string | null
          id?: string
          issue_type: string
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          source_link?: string | null
          status?: string | null
          updated_at?: string | null
          url: string
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          created_at?: string | null
          description?: string
          email?: string | null
          id?: string
          issue_type?: string
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          source_link?: string | null
          status?: string | null
          updated_at?: string | null
          url?: string
          user_id?: string | null
        }
        Relationships: []
      }
      devotionals: {
        Row: {
          action: string | null
          author: string | null
          created_at: string | null
          day_of_year: number | null
          id: string
          passage_ref: string
          passage_text: string
          prayer: string | null
          published: boolean | null
          published_at: string | null
          published_by: string | null
          reflection: string
          reviewed_at: string | null
          reviewed_by: string | null
          series_day: number | null
          series_slug: string | null
          slug: string
          theme: string
          title: string
          updated_at: string | null
          workflow_state: string | null
        }
        Insert: {
          action?: string | null
          author?: string | null
          created_at?: string | null
          day_of_year?: number | null
          id?: string
          passage_ref: string
          passage_text: string
          prayer?: string | null
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reflection: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          series_day?: number | null
          series_slug?: string | null
          slug: string
          theme: string
          title: string
          updated_at?: string | null
          workflow_state?: string | null
        }
        Update: {
          action?: string | null
          author?: string | null
          created_at?: string | null
          day_of_year?: number | null
          id?: string
          passage_ref?: string
          passage_text?: string
          prayer?: string | null
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reflection?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          series_day?: number | null
          series_slug?: string | null
          slug?: string
          theme?: string
          title?: string
          updated_at?: string | null
          workflow_state?: string | null
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          anonymous: boolean
          created_at: string
          crypto_currency: string | null
          currency: string
          donation_type: Database["public"]["Enums"]["donation_type"]
          id: string
          metadata: Json | null
          notes: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          paypal_payment_id: string | null
          paypal_subscription_id: string | null
          processed_at: string | null
          status: Database["public"]["Enums"]["donation_status"]
          stripe_customer_id: string | null
          stripe_payment_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          anonymous?: boolean
          created_at?: string
          crypto_currency?: string | null
          currency?: string
          donation_type?: Database["public"]["Enums"]["donation_type"]
          id?: string
          metadata?: Json | null
          notes?: string | null
          payment_method: Database["public"]["Enums"]["payment_method"]
          paypal_payment_id?: string | null
          paypal_subscription_id?: string | null
          processed_at?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          stripe_customer_id?: string | null
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          anonymous?: boolean
          created_at?: string
          crypto_currency?: string | null
          currency?: string
          donation_type?: Database["public"]["Enums"]["donation_type"]
          id?: string
          metadata?: Json | null
          notes?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"]
          paypal_payment_id?: string | null
          paypal_subscription_id?: string | null
          processed_at?: string | null
          status?: Database["public"]["Enums"]["donation_status"]
          stripe_customer_id?: string | null
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      external_resource_tags: {
        Row: {
          resource_id: string
          tag_id: string
        }
        Insert: {
          resource_id: string
          tag_id: string
        }
        Update: {
          resource_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "external_resource_tags_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "external_resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "external_resource_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      external_resources: {
        Row: {
          canonical_url: string
          created_at: string | null
          excerpt: string | null
          external_id: string | null
          id: string
          image_url: string | null
          imported_at: string | null
          published_at: string | null
          rrg_note: string | null
          slug: string
          source_id: string
          status: Database["public"]["Enums"]["external_resource_status"] | null
          title: string
          type: Database["public"]["Enums"]["external_resource_type"]
          updated_at: string | null
        }
        Insert: {
          canonical_url: string
          created_at?: string | null
          excerpt?: string | null
          external_id?: string | null
          id?: string
          image_url?: string | null
          imported_at?: string | null
          published_at?: string | null
          rrg_note?: string | null
          slug: string
          source_id: string
          status?:
            | Database["public"]["Enums"]["external_resource_status"]
            | null
          title: string
          type: Database["public"]["Enums"]["external_resource_type"]
          updated_at?: string | null
        }
        Update: {
          canonical_url?: string
          created_at?: string | null
          excerpt?: string | null
          external_id?: string | null
          id?: string
          image_url?: string | null
          imported_at?: string | null
          published_at?: string | null
          rrg_note?: string | null
          slug?: string
          source_id?: string
          status?:
            | Database["public"]["Enums"]["external_resource_status"]
            | null
          title?: string
          type?: Database["public"]["Enums"]["external_resource_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "external_resources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      feast_calendar_entries: {
        Row: {
          category: string
          created_at: string | null
          display_order: number | null
          end_date: string | null
          how_to_observe: string | null
          how_to_prepare: string | null
          id: string
          is_all_day: boolean | null
          meaning: string | null
          notes: string | null
          prophetic_significance: string | null
          scripture_refs: string | null
          short_description: string | null
          slug: string
          start_date: string
          title: string
          updated_at: string | null
          why_it_matters: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          display_order?: number | null
          end_date?: string | null
          how_to_observe?: string | null
          how_to_prepare?: string | null
          id?: string
          is_all_day?: boolean | null
          meaning?: string | null
          notes?: string | null
          prophetic_significance?: string | null
          scripture_refs?: string | null
          short_description?: string | null
          slug: string
          start_date: string
          title: string
          updated_at?: string | null
          why_it_matters?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          display_order?: number | null
          end_date?: string | null
          how_to_observe?: string | null
          how_to_prepare?: string | null
          id?: string
          is_all_day?: boolean | null
          meaning?: string | null
          notes?: string | null
          prophetic_significance?: string | null
          scripture_refs?: string | null
          short_description?: string | null
          slug?: string
          start_date?: string
          title?: string
          updated_at?: string | null
          why_it_matters?: string | null
        }
        Relationships: []
      }
      incidents: {
        Row: {
          created_at: string | null
          id: string
          impact: string
          resolved_at: string | null
          started_at: string
          status: string
          title: string
          updated_at: string | null
          updates: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          impact: string
          resolved_at?: string | null
          started_at?: string
          status?: string
          title: string
          updated_at?: string | null
          updates?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          impact?: string
          resolved_at?: string | null
          started_at?: string
          status?: string
          title?: string
          updated_at?: string | null
          updates?: Json | null
        }
        Relationships: []
      }
      ingestion_runs: {
        Row: {
          ended_at: string | null
          error_message: string | null
          id: string
          items_created: number | null
          items_found: number | null
          items_updated: number | null
          source_id: string
          started_at: string
          status: Database["public"]["Enums"]["ingestion_run_status"]
        }
        Insert: {
          ended_at?: string | null
          error_message?: string | null
          id?: string
          items_created?: number | null
          items_found?: number | null
          items_updated?: number | null
          source_id: string
          started_at?: string
          status: Database["public"]["Enums"]["ingestion_run_status"]
        }
        Update: {
          ended_at?: string | null
          error_message?: string | null
          id?: string
          items_created?: number | null
          items_found?: number | null
          items_updated?: number | null
          source_id?: string
          started_at?: string
          status?: Database["public"]["Enums"]["ingestion_run_status"]
        }
        Relationships: [
          {
            foreignKeyName: "ingestion_runs_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      media_library: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          file_path: string
          file_size: number
          file_url: string
          filename: string
          folder_path: string | null
          height: number | null
          id: string
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type: string
          original_name: string
          tags: string[] | null
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          file_path: string
          file_size: number
          file_url: string
          filename: string
          folder_path?: string | null
          height?: number | null
          id?: string
          media_type: Database["public"]["Enums"]["media_type"]
          mime_type: string
          original_name: string
          tags?: string[] | null
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          file_path?: string
          file_size?: number
          file_url?: string
          filename?: string
          folder_path?: string | null
          height?: number | null
          id?: string
          media_type?: Database["public"]["Enums"]["media_type"]
          mime_type?: string
          original_name?: string
          tags?: string[] | null
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: []
      }
      merch_fulfillment_jobs: {
        Row: {
          attempts: number
          created_at: string
          external_id: string | null
          id: string
          last_error: string | null
          order_id: string
          payload: Json | null
          provider: string
          status: string
          updated_at: string
        }
        Insert: {
          attempts?: number
          created_at?: string
          external_id?: string | null
          id?: string
          last_error?: string | null
          order_id: string
          payload?: Json | null
          provider?: string
          status?: string
          updated_at?: string
        }
        Update: {
          attempts?: number
          created_at?: string
          external_id?: string | null
          id?: string
          last_error?: string | null
          order_id?: string
          payload?: Json | null
          provider?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "merch_fulfillment_jobs_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "merch_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      merch_order_items: {
        Row: {
          attributes: Json | null
          created_at: string
          id: string
          image_url: string | null
          line_total_cents: number
          order_id: string
          product_id: string
          quantity: number
          sku: string | null
          title: string
          unit_price_cents: number
          variant_id: string
        }
        Insert: {
          attributes?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          line_total_cents: number
          order_id: string
          product_id: string
          quantity: number
          sku?: string | null
          title: string
          unit_price_cents: number
          variant_id: string
        }
        Update: {
          attributes?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          line_total_cents?: number
          order_id?: string
          product_id?: string
          quantity?: number
          sku?: string | null
          title?: string
          unit_price_cents?: number
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "merch_order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "merch_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merch_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "merch_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "merch_order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "merch_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      merch_orders: {
        Row: {
          cancelled_at: string | null
          created_at: string
          currency: string
          customer_email: string
          customer_name: string | null
          customer_notes: string | null
          fulfilled_at: string | null
          id: string
          provider: string | null
          shipping_address: Json | null
          shipping_name: string | null
          shipping_phone: string | null
          status: string
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          subtotal_cents: number
          total_cents: number
          updated_at: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          customer_email: string
          customer_name?: string | null
          customer_notes?: string | null
          fulfilled_at?: string | null
          id?: string
          provider?: string | null
          shipping_address?: Json | null
          shipping_name?: string | null
          shipping_phone?: string | null
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string
          currency?: string
          customer_email?: string
          customer_name?: string | null
          customer_notes?: string | null
          fulfilled_at?: string | null
          id?: string
          provider?: string | null
          shipping_address?: Json | null
          shipping_name?: string | null
          shipping_phone?: string | null
          status?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          subtotal_cents?: number
          total_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      merch_products: {
        Row: {
          created_at: string
          description: string | null
          featured: boolean
          id: string
          provider: string
          provider_payload: Json | null
          provider_product_id: string | null
          slug: string
          status: string
          synced_at: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          provider?: string
          provider_payload?: Json | null
          provider_product_id?: string | null
          slug: string
          status?: string
          synced_at?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          featured?: boolean
          id?: string
          provider?: string
          provider_payload?: Json | null
          provider_product_id?: string | null
          slug?: string
          status?: string
          synced_at?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      merch_variants: {
        Row: {
          attributes: Json | null
          created_at: string
          id: string
          image_url: string | null
          price_cents: number
          product_id: string
          provider: string
          provider_variant_id: string | null
          sku: string | null
          status: string
          title: string | null
          updated_at: string
        }
        Insert: {
          attributes?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          price_cents: number
          product_id: string
          provider?: string
          provider_variant_id?: string | null
          sku?: string | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Update: {
          attributes?: Json | null
          created_at?: string
          id?: string
          image_url?: string | null
          price_cents?: number
          product_id?: string
          provider?: string
          provider_variant_id?: string | null
          sku?: string | null
          status?: string
          title?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "merch_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "merch_products"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          id: string
          room_id: string
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          room_id: string
          text: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          room_id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      music: {
        Row: {
          audio_src: string | null
          author: string | null
          created_at: string | null
          id: string
          notes_md: string | null
          platform: string | null
          published: boolean | null
          published_at: string | null
          published_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scriptures: string[] | null
          slug: string
          title: string
          type: string
          updated_at: string | null
          video_id: string | null
          workflow_state: string | null
        }
        Insert: {
          audio_src?: string | null
          author?: string | null
          created_at?: string | null
          id?: string
          notes_md?: string | null
          platform?: string | null
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scriptures?: string[] | null
          slug: string
          title: string
          type: string
          updated_at?: string | null
          video_id?: string | null
          workflow_state?: string | null
        }
        Update: {
          audio_src?: string | null
          author?: string | null
          created_at?: string | null
          id?: string
          notes_md?: string | null
          platform?: string | null
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scriptures?: string[] | null
          slug?: string
          title?: string
          type?: string
          updated_at?: string | null
          video_id?: string | null
          workflow_state?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          source: string | null
          subscribed: boolean | null
          subscribed_at: string | null
          unsubscribed_at: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          source?: string | null
          subscribed?: boolean | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          source?: string | null
          subscribed?: boolean | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          author: string | null
          body_md: string | null
          created_at: string | null
          id: string
          published: boolean | null
          published_at: string | null
          published_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          slug: string
          summary: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          workflow_state: string | null
        }
        Insert: {
          author?: string | null
          body_md?: string | null
          created_at?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug: string
          summary?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          workflow_state?: string | null
        }
        Update: {
          author?: string | null
          body_md?: string | null
          created_at?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          slug?: string
          summary?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          workflow_state?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
          last_login: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          last_login?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          last_login?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          status?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth: string
          created_at: string | null
          endpoint: string
          id: string
          p256dh: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          auth: string
          created_at?: string | null
          endpoint: string
          id?: string
          p256dh: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          auth?: string
          created_at?: string | null
          endpoint?: string
          id?: string
          p256dh?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      push_tokens: {
        Row: {
          created_at: string | null
          id: number
          platform: string
          token: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          platform: string
          token: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: number
          platform?: string
          token?: string
          user_id?: string
        }
        Relationships: []
      }
      radio_admin_commands: {
        Row: {
          command_type: string
          created_at: string
          created_by: string | null
          error: string | null
          id: string
          payload: Json
          processed_at: string | null
          status: string
        }
        Insert: {
          command_type: string
          created_at?: string
          created_by?: string | null
          error?: string | null
          id?: string
          payload: Json
          processed_at?: string | null
          status?: string
        }
        Update: {
          command_type?: string
          created_at?: string
          created_by?: string | null
          error?: string | null
          id?: string
          payload?: Json
          processed_at?: string | null
          status?: string
        }
        Relationships: []
      }
      radio_listener_events: {
        Row: {
          anon_id: string | null
          client_event_id: string | null
          created_at: string
          event_type: string
          id: string
          ip_hash: string | null
          metadata: Json
          referrer: string | null
          session_id: string
          source_path: string | null
          stream_mode: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          client_event_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          ip_hash?: string | null
          metadata?: Json
          referrer?: string | null
          session_id: string
          source_path?: string | null
          stream_mode?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          client_event_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          ip_hash?: string | null
          metadata?: Json
          referrer?: string | null
          session_id?: string
          source_path?: string | null
          stream_mode?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      radio_now_playing: {
        Row: {
          artist: string | null
          id: string
          lane: string
          metadata: Json | null
          title: string | null
          updated_at: string
          uri: string | null
        }
        Insert: {
          artist?: string | null
          id?: string
          lane: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string
          uri?: string | null
        }
        Update: {
          artist?: string | null
          id?: string
          lane?: string
          metadata?: Json | null
          title?: string | null
          updated_at?: string
          uri?: string | null
        }
        Relationships: []
      }
      radio_playlist: {
        Row: {
          artist: string | null
          audio_url: string
          cover_image_url: string | null
          created_at: string | null
          duration_seconds: number | null
          id: string
          is_active: boolean | null
          sort_order: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          artist?: string | null
          audio_url: string
          cover_image_url?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          artist?: string | null
          audio_url?: string
          cover_image_url?: string | null
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      radio_program_queue: {
        Row: {
          artist: string
          audio_url: string
          created_at: string
          error_message: string | null
          id: string
          play_after_current: boolean
          played_at: string | null
          position: number
          queued_at: string | null
          request_id: string | null
          requested_at: string
          requested_by: string | null
          scheduled_for: string | null
          source_type: string
          started_at: string | null
          status: string
          title: string
          track_id: string | null
          updated_at: string
          upload_queue_id: string | null
        }
        Insert: {
          artist?: string
          audio_url: string
          created_at?: string
          error_message?: string | null
          id?: string
          play_after_current?: boolean
          played_at?: string | null
          position: number
          queued_at?: string | null
          request_id?: string | null
          requested_at?: string
          requested_by?: string | null
          scheduled_for?: string | null
          source_type: string
          started_at?: string | null
          status?: string
          title: string
          track_id?: string | null
          updated_at?: string
          upload_queue_id?: string | null
        }
        Update: {
          artist?: string
          audio_url?: string
          created_at?: string
          error_message?: string | null
          id?: string
          play_after_current?: boolean
          played_at?: string | null
          position?: number
          queued_at?: string | null
          request_id?: string | null
          requested_at?: string
          requested_by?: string | null
          scheduled_for?: string | null
          source_type?: string
          started_at?: string | null
          status?: string
          title?: string
          track_id?: string | null
          updated_at?: string
          upload_queue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "radio_program_queue_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "radio_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "radio_program_queue_track_id_fkey"
            columns: ["track_id"]
            isOneToOne: false
            referencedRelation: "radio_playlist"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "radio_program_queue_upload_queue_id_fkey"
            columns: ["upload_queue_id"]
            isOneToOne: false
            referencedRelation: "radio_upload_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      radio_recurring_schedules: {
        Row: {
          artist: string | null
          audio_url: string
          category: string
          cover_image_url: string | null
          created_at: string
          days_of_week: number[]
          enabled: boolean
          hour_et: number
          id: string
          last_queued_et_date: string | null
          minute_et: number
          title: string
          updated_at: string
        }
        Insert: {
          artist?: string | null
          audio_url: string
          category?: string
          cover_image_url?: string | null
          created_at?: string
          days_of_week: number[]
          enabled?: boolean
          hour_et: number
          id?: string
          last_queued_et_date?: string | null
          minute_et: number
          title: string
          updated_at?: string
        }
        Update: {
          artist?: string | null
          audio_url?: string
          category?: string
          cover_image_url?: string | null
          created_at?: string
          days_of_week?: number[]
          enabled?: boolean
          hour_et?: number
          id?: string
          last_queued_et_date?: string | null
          minute_et?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      radio_requests: {
        Row: {
          ad_budget: string | null
          ad_business_name: string | null
          ad_copy: string | null
          ad_schedule: string | null
          additional_details: string | null
          anon_id: string | null
          approved_at: string | null
          completed_at: string | null
          created_at: string
          dedication_message: string | null
          email: string
          file_mime_type: string | null
          file_original_name: string | null
          file_size_bytes: number | null
          file_storage_path: string | null
          file_url: string | null
          id: string
          organization: string | null
          phone: string | null
          playback_uri: string | null
          queued_program_queue_id: string | null
          rejected_at: string | null
          request_type: string
          requested_track_id: string | null
          requester_name: string
          reviewed_at: string | null
          reviewed_by: string | null
          scheduled_for: string | null
          song_artist: string | null
          song_link: string | null
          song_title: string | null
          status: string
          status_notes: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          ad_budget?: string | null
          ad_business_name?: string | null
          ad_copy?: string | null
          ad_schedule?: string | null
          additional_details?: string | null
          anon_id?: string | null
          approved_at?: string | null
          completed_at?: string | null
          created_at?: string
          dedication_message?: string | null
          email: string
          file_mime_type?: string | null
          file_original_name?: string | null
          file_size_bytes?: number | null
          file_storage_path?: string | null
          file_url?: string | null
          id?: string
          organization?: string | null
          phone?: string | null
          playback_uri?: string | null
          queued_program_queue_id?: string | null
          rejected_at?: string | null
          request_type: string
          requested_track_id?: string | null
          requester_name: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          song_artist?: string | null
          song_link?: string | null
          song_title?: string | null
          status?: string
          status_notes?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          ad_budget?: string | null
          ad_business_name?: string | null
          ad_copy?: string | null
          ad_schedule?: string | null
          additional_details?: string | null
          anon_id?: string | null
          approved_at?: string | null
          completed_at?: string | null
          created_at?: string
          dedication_message?: string | null
          email?: string
          file_mime_type?: string | null
          file_original_name?: string | null
          file_size_bytes?: number | null
          file_storage_path?: string | null
          file_url?: string | null
          id?: string
          organization?: string | null
          phone?: string | null
          playback_uri?: string | null
          queued_program_queue_id?: string | null
          rejected_at?: string | null
          request_type?: string
          requested_track_id?: string | null
          requester_name?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          scheduled_for?: string | null
          song_artist?: string | null
          song_link?: string | null
          song_title?: string | null
          status?: string
          status_notes?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "radio_requests_queued_program_queue_id_fkey"
            columns: ["queued_program_queue_id"]
            isOneToOne: false
            referencedRelation: "radio_program_queue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "radio_requests_requested_track_id_fkey"
            columns: ["requested_track_id"]
            isOneToOne: false
            referencedRelation: "radio_playlist"
            referencedColumns: ["id"]
          },
        ]
      }
      radio_upload_queue: {
        Row: {
          artist: string
          created_at: string
          created_by: string | null
          error_message: string | null
          file_url: string
          id: string
          original_filename: string
          queue_after_sync: boolean
          status: string
          storage_path: string
          synced_at: string | null
          title: string
          updated_at: string
          upload_type: string
        }
        Insert: {
          artist?: string
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          file_url: string
          id?: string
          original_filename: string
          queue_after_sync?: boolean
          status?: string
          storage_path: string
          synced_at?: string | null
          title: string
          updated_at?: string
          upload_type?: string
        }
        Update: {
          artist?: string
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          file_url?: string
          id?: string
          original_filename?: string
          queue_after_sync?: boolean
          status?: string
          storage_path?: string
          synced_at?: string | null
          title?: string
          updated_at?: string
          upload_type?: string
        }
        Relationships: []
      }
      radio_worker_health: {
        Row: {
          consecutive_failures: number
          created_at: string
          host: string
          last_error: string | null
          last_poll_at: string
          last_success_at: string | null
          queue_items_last_seen: number
          updated_at: string
          version: string
          worker_id: string
        }
        Insert: {
          consecutive_failures?: number
          created_at?: string
          host: string
          last_error?: string | null
          last_poll_at?: string
          last_success_at?: string | null
          queue_items_last_seen?: number
          updated_at?: string
          version: string
          worker_id: string
        }
        Update: {
          consecutive_failures?: number
          created_at?: string
          host?: string
          last_error?: string | null
          last_poll_at?: string
          last_success_at?: string | null
          queue_items_last_seen?: number
          updated_at?: string
          version?: string
          worker_id?: string
        }
        Relationships: []
      }
      reset_email_queue: {
        Row: {
          created_at: string | null
          day: number
          email: string
          error_message: string | null
          id: string
          scheduled_for: string
          sent_at: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          day: number
          email: string
          error_message?: string | null
          id?: string
          scheduled_for: string
          sent_at?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          day?: number
          email?: string
          error_message?: string | null
          id?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reset_progress: {
        Row: {
          completed_days: number[] | null
          created_at: string | null
          current_day: number
          id: string
          last_completed_at: string | null
          start_date: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_days?: number[] | null
          created_at?: string | null
          current_day?: number
          id?: string
          last_completed_at?: string | null
          start_date?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_days?: number[] | null
          created_at?: string | null
          current_day?: number
          id?: string
          last_completed_at?: string | null
          start_date?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      room_members: {
        Row: {
          created_at: string
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          room_id?: string
          user_id?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          id: string
          name: string | null
          topic: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          topic?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          topic?: string | null
        }
        Relationships: []
      }
      rooms_users: {
        Row: {
          created_at: string | null
          room_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          room_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          room_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_users_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      search_events: {
        Row: {
          anon_id: string | null
          created_at: string | null
          filters: Json | null
          id: string
          ip_hash: string | null
          query: string
          result_count: number
          top_types: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string
          ip_hash?: string | null
          query: string
          result_count?: number
          top_types?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          created_at?: string | null
          filters?: Json | null
          id?: string
          ip_hash?: string | null
          query?: string
          result_count?: number
          top_types?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      series: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          label: string
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          label: string
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          label?: string
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      site_notifications: {
        Row: {
          body: string
          created_at: string | null
          expires_at: string | null
          id: string
          require_interaction: boolean | null
          sent_by: string | null
          title: string
          url: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          require_interaction?: boolean | null
          sent_by?: string | null
          title: string
          url?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          require_interaction?: boolean | null
          sent_by?: string | null
          title?: string
          url?: string | null
        }
        Relationships: []
      }
      sources: {
        Row: {
          created_at: string | null
          id: string
          is_enabled: boolean | null
          name: string
          rss_url: string | null
          slug: string
          updated_at: string | null
          website_url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          name: string
          rss_url?: string | null
          slug: string
          updated_at?: string | null
          website_url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          name?: string
          rss_url?: string | null
          slug?: string
          updated_at?: string | null
          website_url?: string
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          anon_id: string | null
          category: string
          created_at: string | null
          email: string
          id: string
          message: string
          name: string | null
          notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          category: string
          created_at?: string | null
          email: string
          id?: string
          message: string
          name?: string | null
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          category?: string
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string | null
          notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          category: string
          description: string | null
          key: string
          updated_at: string | null
          updated_by: string | null
          value: Json
        }
        Insert: {
          category: string
          description?: string | null
          key: string
          updated_at?: string | null
          updated_by?: string | null
          value: Json
        }
        Update: {
          category?: string
          description?: string | null
          key?: string
          updated_at?: string | null
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      tags: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      testimonies: {
        Row: {
          anon_id: string | null
          anonymous: boolean
          category: string | null
          created_at: string
          email: string | null
          id: string
          is_public: boolean
          name: string | null
          notes: string | null
          published_at: string | null
          source: string | null
          status: string
          testimony: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          anon_id?: string | null
          anonymous?: boolean
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_public?: boolean
          name?: string | null
          notes?: string | null
          published_at?: string | null
          source?: string | null
          status?: string
          testimony: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          anon_id?: string | null
          anonymous?: boolean
          category?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_public?: boolean
          name?: string | null
          notes?: string | null
          published_at?: string | null
          source?: string | null
          status?: string
          testimony?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          content_id: string
          content_type: string
          id: string
          progress: number | null
          slug: string
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content_id: string
          content_type: string
          id?: string
          progress?: number | null
          slug: string
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content_id?: string
          content_type?: string
          id?: string
          progress?: number | null
          slug?: string
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_lesson_progress: {
        Row: {
          completed: boolean | null
          completed_at: string | null
          course_slug: string
          created_at: string | null
          id: string
          lesson_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean | null
          completed_at?: string | null
          course_slug: string
          created_at?: string | null
          id?: string
          lesson_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean | null
          completed_at?: string | null
          course_slug?: string
          created_at?: string | null
          id?: string
          lesson_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          show_sacred_names: boolean | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          show_sacred_names?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          show_sacred_names?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          completed_at: string | null
          content_slug: string
          content_type: string
          id: string
          pathway: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          content_slug: string
          content_type: string
          id?: string
          pathway: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          content_slug?: string
          content_type?: string
          id?: string
          pathway?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_wallets: {
        Row: {
          chain_id: number
          created_at: string | null
          id: string
          is_primary: boolean | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
          verified_at: string | null
          wallet_address: string
        }
        Insert: {
          chain_id: number
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
          wallet_address: string
        }
        Update: {
          chain_id?: number
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
          verified_at?: string | null
          wallet_address?: string
        }
        Relationships: []
      }
      video_reports: {
        Row: {
          created_at: string | null
          honeypot_value: string | null
          id: string
          ip_address: unknown
          issue_type: string
          message: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
          user_agent: string | null
          user_email: string | null
          user_id: string | null
          video_url: string
        }
        Insert: {
          created_at?: string | null
          honeypot_value?: string | null
          id?: string
          ip_address?: unknown
          issue_type: string
          message: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          video_url: string
        }
        Update: {
          created_at?: string | null
          honeypot_value?: string | null
          id?: string
          ip_address?: unknown
          issue_type?: string
          message?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_agent?: string | null
          user_email?: string | null
          user_id?: string | null
          video_url?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          author: string | null
          created_at: string | null
          id: string
          notes_md: string | null
          platform: string
          published: boolean | null
          published_at: string | null
          published_by: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          scriptures: string[] | null
          series: string[] | null
          slug: string
          title: string
          topics: string[] | null
          transcript: string | null
          updated_at: string | null
          video_id: string
          workflow_state: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string | null
          id?: string
          notes_md?: string | null
          platform: string
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scriptures?: string[] | null
          series?: string[] | null
          slug: string
          title: string
          topics?: string[] | null
          transcript?: string | null
          updated_at?: string | null
          video_id: string
          workflow_state?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string | null
          id?: string
          notes_md?: string | null
          platform?: string
          published?: boolean | null
          published_at?: string | null
          published_by?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          scriptures?: string[] | null
          series?: string[] | null
          slug?: string
          title?: string
          topics?: string[] | null
          transcript?: string | null
          updated_at?: string | null
          video_id?: string
          workflow_state?: string | null
        }
        Relationships: []
      }
      wallet_nonces: {
        Row: {
          created_at: string | null
          expires_at: string
          nonce: string
          wallet_address: string
        }
        Insert: {
          created_at?: string | null
          expires_at: string
          nonce: string
          wallet_address: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string
          nonce?: string
          wallet_address?: string
        }
        Relationships: []
      }
      workflow_history: {
        Row: {
          changed_by: string | null
          comment: string | null
          content_id: string
          content_type: string
          created_at: string | null
          from_state: string | null
          id: string
          to_state: string
        }
        Insert: {
          changed_by?: string | null
          comment?: string | null
          content_id: string
          content_type: string
          created_at?: string | null
          from_state?: string | null
          id?: string
          to_state: string
        }
        Update: {
          changed_by?: string | null
          comment?: string | null
          content_id?: string
          content_type?: string
          created_at?: string | null
          from_state?: string | null
          id?: string
          to_state?: string
        }
        Relationships: []
      }
    }
    Views: {
      latest_posts: {
        Row: {
          content_type: Database["public"]["Enums"]["content_type"] | null
          created_at: string | null
          id: string | null
          published_at: string | null
          slug: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          title: string | null
          updated_at: string | null
        }
        Relationships: []
      }
      trending_content: {
        Row: {
          avg_engagement: number | null
          content_id: string | null
          content_type: string | null
          total_views: number | null
          total_visitors: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      blog_most_read_month: {
        Args: { p_limit?: number; p_ym: string }
        Returns: {
          slug: string
          view_count: number
        }[]
      }
      call_api_endpoint: {
        Args: { endpoint_url: string; secret_key?: string }
        Returns: number
      }
      cleanup_expired_nonces: { Args: never; Returns: undefined }
      generate_cert_id: { Args: never; Returns: string }
      get_dashboard_stats: { Args: never; Returns: Json }
      get_user_activity_summary: { Args: { p_user_id: string }; Returns: Json }
      log_user_activity: {
        Args: {
          p_activity_type: string
          p_description: string
          p_metadata?: Json
          p_user_id: string
        }
        Returns: string
      }
      prune_old_analytics_events: {
        Args: { p_retention_days?: number }
        Returns: {
          deleted_rows: number
          table_name: string
        }[]
      }
      track_content_view: {
        Args: {
          p_content_id: string
          p_content_type: string
          p_time_on_page?: number
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "user" | "admin" | "editor"
      content_status: "draft" | "review" | "published" | "archived"
      content_type: "blog" | "video" | "book" | "music"
      content_type_for_link: "blog" | "video" | "page"
      donation_status: "pending" | "completed" | "failed" | "refunded"
      donation_type: "one-time" | "recurring"
      external_resource_status: "draft" | "pending" | "approved" | "rejected"
      external_resource_type: "article" | "video" | "pdf" | "page"
      ingestion_run_status: "success" | "failed"
      media_type: "image" | "video" | "audio" | "document"
      payment_method:
        | "stripe"
        | "paypal"
        | "venmo"
        | "cashapp"
        | "zelle"
        | "crypto"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin", "editor"],
      content_status: ["draft", "review", "published", "archived"],
      content_type: ["blog", "video", "book", "music"],
      content_type_for_link: ["blog", "video", "page"],
      donation_status: ["pending", "completed", "failed", "refunded"],
      donation_type: ["one-time", "recurring"],
      external_resource_status: ["draft", "pending", "approved", "rejected"],
      external_resource_type: ["article", "video", "pdf", "page"],
      ingestion_run_status: ["success", "failed"],
      media_type: ["image", "video", "audio", "document"],
      payment_method: [
        "stripe",
        "paypal",
        "venmo",
        "cashapp",
        "zelle",
        "crypto",
      ],
    },
  },
} as const

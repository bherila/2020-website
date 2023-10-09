'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ParsedSPGPPassType } from '@/app/spgp/SPGPPassTypes'
import Row from 'react-bootstrap/Row'

const schema = z.object({
  r_name: z.string().min(1, { message: 'Required' }),
  r_email: z.string().email(),
  r_birthdate: z.date(),
  r_previous_passid: z.string().regex(/I\d{8,25}|^$/i), // either iXXXXX or empty
  passtype_id: z.coerce.number().gt(0),
})

const NewSPGPRequestForm = (props: { passTypes?: ParsedSPGPPassType[] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <Row>
        <label>
          Full name (must match photo ID): <input {...register('r_name')} />
        </label>
        {errors.r_name?.message && <p>{errors.r_name?.message as string}</p>}
      </Row>

      <Row>
        <label>
          Email of pass holder: <input type="email" {...register('r_email')} />
        </label>
        {errors.r_email?.message && <p>{errors.r_email?.message as string}</p>}
      </Row>

      <Row>
        <label>
          Birth date:
          <input type="date" {...register('r_birthdate')} />
        </label>
        {errors.r_birthdate?.message && (
          <p>{errors.r_birthdate?.message as string}</p>
        )}
      </Row>

      <Row>
        <label>
          Type requested:
          {props.passTypes?.map((passType) => (
            <label key={passType.passtype_id}>
              <input
                type="radio"
                {...register('passtype_id')}
                value={passType.passtype_id}
              />
              {passType.display_name}
            </label>
          ))}
        </label>
        {errors.passtype_id?.message && (
          <p>{errors.passtype_id?.message as string}</p>
        )}
      </Row>

      <Row>
        <label>
          (If applicable) Previous pass ID (starts with letter I):{' '}
          <input {...register('r_previous_passid')} />
        </label>
        {errors.r_previous_passid?.message && (
          <p>{errors.r_previous_passid?.message as string}</p>
        )}
      </Row>

      <input type="submit" />
    </form>
  )
}

export default NewSPGPRequestForm
